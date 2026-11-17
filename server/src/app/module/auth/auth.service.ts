import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import type {
    ICreateUser,
    IForgotPasswordPayload,
    IGoogleLoginPayload,
    ILoginUser,
    IRequestUser,
    IResetPasswordPayload,
    IVerifyEmail,
} from './auth.interface';
import { AppError } from '../../utils/AppError';
import httpStatus from 'http-status';
import config from '../../config';
import { redisClient } from '../../lib/redis';
import path from 'path';
import ejs from 'ejs';
import { transporter } from '../../lib/nodemailer';
import { randomInt } from 'node:crypto';
import { jwtUtils } from '../../utils/jwt';
import type { JwtPayload, SignOptions } from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { cloudinary } from '../../lib/cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import type { Prisma } from '../../../../generated/prisma/browser';

const registerUserIntoDB = async (payload: ICreateUser) => {
    const { name, password, student } = payload;

    const email = payload.email.trim().toLowerCase();

    // Check existing user
    const isUserExists = await prisma.user.findUnique({
        where: { email },
    });

    if (isUserExists) {
        throw new AppError(
            httpStatus.CONFLICT,
            'User with this email already exists',
        );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // OTP expiration: 5 minutes
    const expirationSeconds = 5 * 60;

    // Generate secure OTP
    const otpKey = `user-registration-otp:${email}`;
    const registrationKey = `user-registration-data:${email}`;

    const otpValue = randomInt(100000, 1000000).toString();

    if (config.node_env === 'development') {
        console.log(`[dev] ${email} : ${otpValue}`);
    }

    // Registration data
    const redisUserDataPayload = {
        name,
        email,
        passwordHash,
        role: 'STUDENT',
        status: 'ACTIVE',
        emailVerified: false,
        needPasswordChange: false,
        imageUrl: '',
        imagePublicId: '',
        student: {
            contactNumber: student?.contactNumber || '',
        },
    };

    // Render email template
    const templatePath = path.join(
        process.cwd(),
        'src/app/templates/registration-user-otp.ejs',
    );

    const html = await ejs.renderFile(templatePath, {
        name,
        email,
        otp: otpValue,
        expirationMinutes: expirationSeconds / 60,
    });

    try {
        // Store OTP in Redis
        await redisClient.set(otpKey, otpValue, {
            expiration: {
                type: 'EX',
                value: expirationSeconds,
            },
        });

        // Store registration data in Redis
        await redisClient.set(
            registrationKey,
            JSON.stringify(redisUserDataPayload),
            {
                expiration: {
                    type: 'EX',
                    value: expirationSeconds,
                },
            },
        );

        // Send verification email
        await transporter.sendMail({
            from: config.email_sender,
            to: email,
            subject: 'Email Verification',
            html,
        });
    } catch (error) {
        // Cleanup Redis data if anything fails
        await Promise.allSettled([
            redisClient.del(otpKey),
            redisClient.del(registrationKey),
        ]);

        console.error('Registration OTP error:', error);

        throw new AppError(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Failed to process registration or send verification email',
        );
    }

    return {
        email,
        message: 'Verification OTP sent successfully',
        expiresIn: expirationSeconds,
    };
};

const verifyUserEmailIntoDB = async (payload: IVerifyEmail) => {
    const otp = payload.otp;
    const email = payload.email.trim().toLowerCase();

    // Check existing user
    const isUserExists = await prisma.user.findUnique({
        where: { email },
    });

    if (isUserExists?.status === 'BLOCKED') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked!');
    }

    if (isUserExists?.emailVerified) {
        throw new AppError(httpStatus.CONFLICT, 'Email Already Verified!');
    }

    if (isUserExists?.deletedAt || isUserExists?.status === 'DELETED') {
        throw new AppError(httpStatus.GONE, 'User is Deleted!');
    }

    // OTP Redis key
    const otpKey = `user-registration-otp:${email}`;

    const redisOtp = await redisClient.get(otpKey);

    if (!redisOtp) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Invalid OTP or OTP Expired!',
        );
    }

    if (redisOtp !== otp) {
        throw new AppError(httpStatus.BAD_REQUEST, 'OTP Does Not Match!');
    }

    // Registration data Redis key
    const userRegistrationKey = `user-registration-data:${email}`;

    const redisUserData = await redisClient.get(userRegistrationKey);

    if (!redisUserData) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'User Registration Data Does Not Exist!',
        );
    }

    const userPayload: ICreateUser & {
        passwordHash: string;
    } = JSON.parse(redisUserData);

    // Create user

    const createdUser = await prisma.user.create({
        data: {
            name: userPayload.name,
            email: userPayload.email,
            role: 'STUDENT',
            status: 'ACTIVE',
            emailVerified: true,
            needPasswordChange: false,
            imageUrl: '',
            imagePublicId: '',

            accounts: {
                create: {
                    provider: 'CREDENTIAL',
                    providerAccountId: email,
                    passwordHash: userPayload.passwordHash,
                },
            },

            student: {
                create: {
                    contactNumber: userPayload.student?.contactNumber || '',
                },
            },
        },
        include: {
            student: true,
        },
    });

    // Delete Redis data after successful creation
    await Promise.all([
        redisClient.del(otpKey),
        redisClient.del(userRegistrationKey),
    ]);

    // Welcome email template
    const templatePath = path.join(
        process.cwd(),
        'src/app/templates/student-welcome-email.ejs',
    );

    const html = await ejs.renderFile(templatePath, {
        name: createdUser.name,
    });

    await transporter.sendMail({
        from: config.email_sender,
        to: email,
        subject: 'Welcome To Your Learning Platform',
        html,
    });

    // JWT Payload
    const jwtPayload = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
    };

    // Access Token
    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions,
    );

    // Refresh Token
    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions,
    );

    // Response
    return {
        user: createdUser,
        student: createdUser.student,
        accessToken,
        refreshToken,
    };
};

const loginUserIntoDB = async (payload: ILoginUser) => {
    const { password } = payload;

    const email = payload.email.trim().toLowerCase();

    // Find user with accounts
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            accounts: {
                where: {
                    provider: 'CREDENTIAL',
                },
            },
        },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (user.status === 'BLOCKED') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
    }

    if (user.deletedAt || user.status === 'DELETED') {
        throw new AppError(httpStatus.GONE, 'User is deleted');
    }

    if (!user.emailVerified) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            'Please verify your email first',
        );
    }

    // Find credential account
    const account = user.accounts[0];

    if (!account?.passwordHash) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    // Compare password
    const isPasswordMatched = await bcrypt.compare(
        password,
        account.passwordHash,
    );

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    // JWT Payload
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions,
    );

    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions,
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            emailVerified: user.emailVerified,
            needPasswordChange: user.needPasswordChange,
            imageUrl: user.imageUrl,
        },
        accessToken,
        refreshToken,
    };
};

const getMeIntoDB = async (user: IRequestUser) => {
    const isUserExists = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            student: true,
        },
    });

    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (isUserExists.deletedAt || isUserExists.status === 'DELETED') {
        throw new AppError(httpStatus.GONE, 'User is deleted');
    }

    if (isUserExists.status === 'BLOCKED') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
    }

    return isUserExists;
};

const refreshTokenIntoDB = async (token: string) => {
    const verifiedRefreshToken = jwtUtils.verifyToken(
        token,
        config.jwt_refresh_secret,
    );

    if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            config.node_env === 'development'
                ? verifiedRefreshToken.error
                : 'Invalid refresh token',
        );
    }

    const data = verifiedRefreshToken.data as JwtPayload & {
        id: string;
        name: string;
        email: string;
        role: string;
    };

    const user = await prisma.user.findUnique({
        where: {
            id: data.id,
        },
    });

    if (!user || user.deletedAt || user.status !== 'ACTIVE') {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            'User is inactive or not found',
        );
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions,
    );

    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions,
    );

    return {
        accessToken,
        refreshToken,
    };
};

const getAllUsersFromDB = async () => {
    const users = await prisma.user.findMany({
        include: {
            student: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return users;
};

const getUserByIdFromDB = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            student: true,
        },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    return user;
};

const updateMyProfileIntoDB = async (
    userId: string,
    payload: Prisma.UserUpdateInput,
) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (user.deletedAt || user.status === 'DELETED') {
        throw new AppError(httpStatus.GONE, 'User is deleted');
    }

    if (user.status === 'BLOCKED') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
    }

    const { name } = payload;

    const updatedUser = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            ...(name !== undefined && { name }),
        },
        include: {
            student: true,
        },
    });

    return updatedUser;
};

const changePasswordIntoDB = async (
    userId: string,
    oldPassword: string,
    newPassword: string,
) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            accounts: {
                where: {
                    provider: 'CREDENTIAL',
                },
            },
        },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (user.status !== 'ACTIVE' || user.deletedAt) {
        throw new AppError(httpStatus.FORBIDDEN, 'User is inactive');
    }

    const account = user.accounts[0];

    if (!account?.passwordHash) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Credential account not found',
        );
    }

    const isPasswordMatched = await bcrypt.compare(
        oldPassword,
        account.passwordHash,
    );

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid old password');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await prisma.account.update({
        where: {
            id: account.id,
        },
        data: {
            passwordHash: hashedNewPassword,
        },
    });

    return {
        message: 'Password changed successfully',
    };
};

const googleClient = new OAuth2Client(config.google_client_id);

const googleLoginIntoDB = async (payload: IGoogleLoginPayload) => {
    let googlePayload;

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: payload.idToken,
            audience: config.google_client_id,
        });

        googlePayload = ticket.getPayload();
    } catch {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Invalid or expired Google ID token',
        );
    }

    if (
        !googlePayload ||
        !googlePayload.email ||
        !googlePayload.name ||
        !googlePayload.sub
    ) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            'Invalid Google account information',
        );
    }

    if (!googlePayload.email_verified) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            'Google email is not verified',
        );
    }

    const email = googlePayload.email.trim().toLowerCase();

    let user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            accounts: true,
        },
    });

    if (user) {
        if (user.status === 'BLOCKED') {
            throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
        }

        if (user.deletedAt || user.status === 'DELETED') {
            throw new AppError(httpStatus.GONE, 'User is deleted');
        }

        const googleAccount = user.accounts.find(
            (account) =>
                account.provider === 'GOOGLE' &&
                account.providerAccountId === googlePayload.sub,
        );

        if (!googleAccount) {
            const credentialAccount = user.accounts.find(
                (account) => account.provider === 'CREDENTIAL',
            );

            if (credentialAccount && !user.emailVerified) {
                throw new AppError(
                    httpStatus.FORBIDDEN,
                    'Please verify your email first',
                );
            }

            // Link Google account with existing user
            await prisma.account.create({
                data: {
                    provider: 'GOOGLE',
                    providerAccountId: googlePayload.sub,
                    userId: user.id,
                },
            });

            user = await prisma.user.findUnique({
                where: {
                    id: user.id,
                },
                include: {
                    accounts: true,
                },
            });
        }
    } else {
        // Create new Google user
        user = await prisma.user.create({
            data: {
                name: googlePayload.name,
                email,
                role: 'STUDENT',
                status: 'ACTIVE',
                emailVerified: true,
                needPasswordChange: false,
                imageUrl: googlePayload.picture || '',
                imagePublicId: '',

                accounts: {
                    create: {
                        provider: 'GOOGLE',
                        providerAccountId: googlePayload.sub,
                    },
                },

                student: {
                    create: {
                        contactNumber: '',
                    },
                },
            },
            include: {
                accounts: true,
            },
        });

        // Welcome email
        const templatePath = path.join(
            process.cwd(),
            'src/app/templates/student-welcome-email.ejs',
        );

        const html = await ejs.renderFile(templatePath, {
            name: user.name,
        });

        await transporter.sendMail({
            from: config.email_sender,
            to: email,
            subject: 'Welcome To Your Learning Platform',
            html,
        });
    }

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions,
    );

    const refreshToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_refresh_secret,
        config.jwt_refresh_expires_in as SignOptions,
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            emailVerified: user.emailVerified,
            needPasswordChange: user.needPasswordChange,
            imageUrl: user.imageUrl,
        },
        accessToken,
        refreshToken,
    };
};

const forgotPasswordIntoDB = async (payload: IForgotPasswordPayload) => {
    const email = payload.email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            accounts: {
                where: {
                    provider: 'CREDENTIAL',
                },
            },
        },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    if (user.status === 'BLOCKED') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
    }

    if (!user.emailVerified) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'User email is not verified',
        );
    }

    if (user.deletedAt || user.status === 'DELETED') {
        throw new AppError(httpStatus.GONE, 'User is deleted');
    }

    const credentialAccount = user.accounts[0];

    if (!credentialAccount) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'This account does not support password recovery',
        );
    }

    const otp = randomInt(100000, 1000000).toString();

    const key = `forgot-password-otp:${email}`;
    const expirationSeconds = 5 * 60;

    const templatePath = path.join(
        process.cwd(),
        'src/app/templates/forgot-password.ejs',
    );

    const html = await ejs.renderFile(templatePath, {
        name: user.name,
        otp,
        expirationMinutes: expirationSeconds / 60,
    });

    try {
        await redisClient.set(key, otp, {
            expiration: {
                type: 'EX',
                value: expirationSeconds,
            },
        });

        await transporter.sendMail({
            from: config.email_sender,
            to: email,
            subject: 'Forgot Password',
            html,
        });
    } catch (error) {
        await redisClient.del(key);

        console.error('Forgot password error:', error);

        throw new AppError(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Failed to send password reset OTP',
        );
    }

    return {
        email,
        expiresIn: expirationSeconds,
    };
};

const resetPasswordIntoDB = async (payload: IResetPasswordPayload) => {
    const { otp, newPassword } = payload;

    const email = payload.email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            accounts: {
                where: {
                    provider: 'CREDENTIAL',
                },
            },
        },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    if (user.status === 'BLOCKED') {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
    }

    if (!user.emailVerified) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'User email is not verified',
        );
    }

    if (user.deletedAt || user.status === 'DELETED') {
        throw new AppError(httpStatus.GONE, 'User is deleted');
    }

    const account = user.accounts[0];

    if (!account) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Credential account not found',
        );
    }

    const key = `forgot-password-otp:${email}`;

    const redisOtp = await redisClient.get(key);

    if (!redisOtp) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Invalid OTP or OTP expired',
        );
    }

    if (redisOtp !== otp) {
        throw new AppError(httpStatus.BAD_REQUEST, 'OTP does not match');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await prisma.account.update({
        where: {
            id: account.id,
        },
        data: {
            passwordHash: hashedNewPassword,
        },
    });

    await redisClient.del(key);

    // Password reset success email
    const templatePath = path.join(
        process.cwd(),
        'src/app/templates/reset-password-success.ejs',
    );

    const html = await ejs.renderFile(templatePath, {
        name: user.name,
    });

    await transporter.sendMail({
        from: config.email_sender,
        to: email,
        subject: 'Password Changed Successfully',
        html,
    });

    return {
        message: 'Password reset successfully',
    };
};

const uploadProfileImageIntoDB = async (buffer: Buffer, userId: string) => {
    const currentUser = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            imageUrl: true,
            imagePublicId: true,
        },
    });

    if (!currentUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const cloudinaryResult = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: 'physics-question-bank/users',
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }

                        if (!result) {
                            return reject(
                                new AppError(
                                    httpStatus.INTERNAL_SERVER_ERROR,
                                    'Cloudinary upload failed',
                                ),
                            );
                        }

                        resolve(result);
                    },
                )
                .end(buffer);
        },
    );

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                imageUrl: cloudinaryResult.secure_url,
                imagePublicId: cloudinaryResult.public_id,
            },
            include: {
                student: true,
            },
        });

        // Delete previous image after successful DB update
        if (currentUser.imagePublicId) {
            await cloudinary.uploader.destroy(currentUser.imagePublicId);
        }

        return updatedUser;
    } catch (error) {
        // Remove newly uploaded image if DB update fails
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);

        throw error;
    }
};

export const AuthServices = {
    registerUserIntoDB,
    verifyUserEmailIntoDB,
    loginUserIntoDB,
    getMeIntoDB,
    refreshTokenIntoDB,
    getAllUsersFromDB,
    getUserByIdFromDB,
    updateMyProfileIntoDB,
    changePasswordIntoDB,
    googleLoginIntoDB,
    forgotPasswordIntoDB,
    resetPasswordIntoDB,
    uploadProfileImageIntoDB,
};
