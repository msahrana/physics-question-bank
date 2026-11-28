import type { CookieOptions, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';
import { AppError } from '../../utils/AppError';

const registerUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    await AuthServices.registerUserIntoDB(payload);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Verification OTP Sent & Verification Your Account...!',
        data: null,
    });
});

const verifyUserEmail = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await AuthServices.verifyUserEmailIntoDB(payload);

    const { user, student, accessToken, refreshToken } = result;

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: config.node_env === 'development' ? false : true,
        sameSite: config.node_env === 'development' ? 'lax' : 'none',
        maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config.node_env === 'development' ? false : true,
        sameSite: config.node_env === 'development' ? 'lax' : 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Email Verified Successfully!',
        data: { user, student, accessToken, refreshToken },
    });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await AuthServices.loginUserIntoDB(payload);

    const { accessToken, refreshToken } = result;

    const isProduction = config.node_env === 'production';

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24,
        path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: '/',
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully.',
        data: {
            accessToken,
            refreshToken,
        },
    });
});

// const getMe = catchAsync(async (req: Request, res: Response) => {
//     const user = req.user as unknown as IRequestUser;

//     if (!user) {
//         throw new AppError(
//             httpStatus.BAD_REQUEST,
//             'User information is missing in the request',
//         );
//     }

//     const result = await AuthServices.getMeIntoDB(user);

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'User Profile Fetched Successfully!',
//         data: result,
//     });
// });

const getMe = catchAsync(async (req: Request, res: Response) => {
    const user = req.user 

    if (!user) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            'User information is missing in the request',
        );
    }

    const result = await AuthServices.getMeIntoDB(user);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Profile Fetched Successfully!',
        data: result,
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    if (!req.cookies.refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Refresh token is missing');
    }

    const result = await AuthServices.refreshTokenIntoDB(
        req.cookies.refreshToken,
    );

    const { accessToken, refreshToken: newRefreshToken } = result;

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: config.node_env === 'development' ? false : true,
        sameSite: config.node_env === 'development' ? 'lax' : 'none',
        maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
    });

    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: config.node_env === 'development' ? false : true,
        sameSite: config.node_env === 'development' ? 'lax' : 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'New tokens generated successfully',
        data: {
            accessToken,
            refreshToken: newRefreshToken,
        },
    });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.getAllUsersFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Users Fetched Successfully!!',
        data: result,
    });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await AuthServices.getUserByIdFromDB(userId as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Found Successfully!',
        data: result,
    });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const payload = req.body;

    const result = await AuthServices.updateMyProfileIntoDB(userId, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile Updated Successfully.',
        data: result,
    });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const { oldPassword, newPassword } = req.body;

    const result = await AuthServices.changePasswordIntoDB(
        userId,
        oldPassword,
        newPassword,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password Changed Successfully.',
        data: result,
    });
});

const googleLogin = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await AuthServices.googleLoginIntoDB(payload);

    const { accessToken, refreshToken } = result;

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: config.node_env === 'development' ? false : true,
        sameSite: config.node_env === 'development' ? 'lax' : 'none',
        maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config.node_env === 'development' ? false : true,
        sameSite: config.node_env === 'development' ? 'lax' : 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'New tokens generated successfully',
        data: {
            accessToken,
            refreshToken,
        },
    });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    await AuthServices.forgotPasswordIntoDB(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `OTP Sent To Email : ${payload.email}`,
        data: null,
    });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    await AuthServices.resetPasswordIntoDB(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password Changed Successfully.',
        data: null,
    });
});

const uploadProfileImage = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.file, 'Req.File:');
    if (!req.file) {
        return res.status(400).json({ error: 'No File Uploaded!!!' });
    }

    const userId = req.user?.id as string;
    const files = req.file?.buffer;

    const result = await AuthServices.uploadProfileImageIntoDB(files, userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'New tokens generated successfully!',
        data: result,
    });
});

const logout = catchAsync(async (req: Request, res: Response) => {
    const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: config.node_env !== 'development',
        sameSite: config.node_env === 'development' ? 'lax' : 'none',
        path: '/',
    };

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Logged out successfully.',
        data: null,
    });
});

export const AuthControllers = {
    registerUser,
    verifyUserEmail,
    loginUser,
    getMe,
    refreshToken,
    getAllUsers,
    getUserById,
    updateMyProfile,
    changePassword,
    googleLogin,
    forgotPassword,
    resetPassword,
    uploadProfileImage,
    logout,
};
