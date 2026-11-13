import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import type { ICreateUser, ILoginUser, IVerifyEmail } from './auth.interface';
import { AppError } from '../../utils/AppError';
import httpStatus from 'http-status';
import config from '../../config';
import { redisClient } from '../../lib/redis';
import path from 'path';
import ejs from 'ejs';
import { transporter } from '../../lib/nodemailer';
import { randomInt } from 'node:crypto';
import { UserStatus } from '../../../../generated/prisma/client';
import { jwtUtils } from '../../utils/jwt';
import type { SignOptions } from 'jsonwebtoken';
import type z from 'zod';
import type { UserValidation } from './auth.validation';

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

export const AuthServices = {
    registerUserIntoDB,
    verifyUserEmailIntoDB,
    loginUserIntoDB,
    //  getMeIntoDB,
    //  refreshTokenIntoDB,
    //  getAllUsersFromDB,
    //  getUserByIdFromDB,
    //  updateMyProfileIntoDB,
    //  changePasswordIntoDB,
    //  googleLoginIntoDB,
    //  forgotPasswordIntoDB,
    //  resetPasswordIntoDB,
    //  uploadProfileImageIntoDB,
};
