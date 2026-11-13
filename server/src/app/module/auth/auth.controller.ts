import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';

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

export const AuthControllers = {
    registerUser,
    verifyUserEmail,
    loginUser,
    // getMe,
    // refreshToken,
    // getAllUsers,
    // getUserById,
    // updateMyProfile,
    // changePassword,
    // googleLogin,
    // forgotPassword,
    // resetPassword,
    // uploadProfileImage,
    // logout,
};
