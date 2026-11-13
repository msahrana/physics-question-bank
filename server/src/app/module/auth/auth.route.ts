import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';

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

// router.get(
//     '/me',
//     auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
//     AuthController.getMe,
// );

// router.post('/refresh-token', AuthController.refreshToken);

// router.get('/all-users', AuthController.getAllUsers);

// router.get('/user/:id', AuthController.getUserById);

// router.put(
//     '/my-profile',
//     auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
//     AuthController.updateMyProfile,
// );

// router.post(
//     '/change-password',
//     auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
//     AuthController.changePassword,
// );

// router.post('/google', AuthController.googleLogin);

// router.post(
//     '/forgot-password',
//     validateRequest(UserValidation.ForgotPasswordZodSchema),
//     AuthController.forgotPassword,
// );

// router.post(
//     '/reset-password',
//     validateRequest(UserValidation.ResetPasswordZodSchema),
//     AuthController.resetPassword,
// );

// router.patch(
//     '/profile-image',
//     auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
//     upload.single('profileImage'),
//     AuthController.uploadProfileImage,
// );

// router.post('/logout', AuthController.logout);

export const AuthRoutes = router;
