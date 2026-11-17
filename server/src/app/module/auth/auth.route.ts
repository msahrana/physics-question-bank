import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { auth } from '../../middleware/checkAuth';
import { UserRole } from '../../../../generated/prisma/enums';
import { upload } from '../../lib/multer';

const router = Router();

router.post(
    '/register',
    validateRequest(UserValidation.UserRegistrationZodSchema),
    AuthControllers.registerUser,
);

router.post(
    '/verify-email',
    validateRequest(UserValidation.UserEmailVerifyZodSchema),
    AuthControllers.verifyUserEmail,
);

router.post(
    '/login',
    validateRequest(UserValidation.LoginZodSchema),
    AuthControllers.loginUser,
);

router.get(
    '/me',
    auth(
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.TEACHER,
        UserRole.STUDENT,
    ),
    AuthControllers.getMe,
);

router.post('/refresh-token', AuthControllers.refreshToken);

router.get('/all-users', AuthControllers.getAllUsers);

router.get('/user/:id', AuthControllers.getUserById);

router.put(
    '/my-profile',
    auth(
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.TEACHER,
        UserRole.STUDENT,
    ),
    AuthControllers.updateMyProfile,
);

router.post(
    '/change-password',
    auth(
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.TEACHER,
        UserRole.STUDENT,
    ),
    AuthControllers.changePassword,
);

router.post('/google', AuthControllers.googleLogin);

router.post(
    '/forgot-password',
    validateRequest(UserValidation.ForgotPasswordZodSchema),
    AuthControllers.forgotPassword,
);

router.post(
    '/reset-password',
    validateRequest(UserValidation.ResetPasswordZodSchema),
    AuthControllers.resetPassword,
);

router.patch(
    '/profile-image',
    auth(
        UserRole.SUPER_ADMIN,
        UserRole.ADMIN,
        UserRole.TEACHER,
        UserRole.STUDENT,
    ),
    upload.single('profileImage'),
    AuthControllers.uploadProfileImage,
);

router.post('/logout', AuthControllers.logout);

export const AuthRoutes = router;
