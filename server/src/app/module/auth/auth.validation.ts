import z from 'zod';

const passwordValidation = z
    .string()
    .min(8, 'Password Must Minimum 8 Characters Long.')
    .regex(/[a-z]/, 'Password must contain at least 1 Lowercase Letter')
    .regex(/[A-Z]/, 'Password must contain at least 1 Uppercase Letter')
    .regex(/[0-9]/, 'Password must contain at least 1 Number')
    .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least 1 Special Character',
    );
    

// User Registration
const UserRegistrationZodSchema = z.object({
    name: z
        .string('Not A String!!!!!')
        .trim()
        .min(3, 'Name must at least 3 characters long!!!')
        .max(30, 'Name cannot exceed 30 characters'),

    email: z.email('Not email!!'),

    password: passwordValidation,
    student: z
        .object({
            contactNumber: z.string().optional(),
        })
        .optional(),
});

// User Email Verification
const UserEmailVerifyZodSchema = z.object({
    email: z.email('Not email!!'),
    otp: z.string().length(6, 'OTP must be exactly 6 digits'),
});

// User Login
const LoginZodSchema = z.object({
    email: z.email('Not email!!'),
    password: z.string().min(8, 'Password Must Minimum 8 Characters Long.'),
});

// Forgot Password
const ForgotPasswordZodSchema = z.object({
    email: z.email('Not email!!'),
});

// Reset Password
const ResetPasswordZodSchema = z.object({
    email: z.email('Not email!!'),
    newPassword: passwordValidation,
    otp: z.string().length(6, 'OTP must be exactly 6 digits'),
});

// Create User (Admin)
const CreateUserZodSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'Name must at least 3 characters long!!!')
        .max(30, 'Name cannot exceed 30 characters'),

    email: z.email('Not email!!'),

    password: passwordValidation,

    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']).optional(),

    status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED', 'DELETED']).optional(),

    emailVerified: z.boolean().optional(),

    needPasswordChange: z.boolean().optional(),

    imageUrl: z.string().optional(),

    imagePublicId: z.string().optional(),
});

// Update User
const UpdateUserZodSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'Name must at least 3 characters long!!!')
        .max(30, 'Name cannot exceed 30 characters')
        .optional(),

    email: z.email('Not email!!').optional(),

    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']).optional(),

    status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED', 'DELETED']).optional(),

    emailVerified: z.boolean().optional(),

    needPasswordChange: z.boolean().optional(),

    imageUrl: z.string().optional(),

    imagePublicId: z.string().optional(),
});

export const UserValidation = {
    UserRegistrationZodSchema,
    UserEmailVerifyZodSchema,
    LoginZodSchema,
    ForgotPasswordZodSchema,
    ResetPasswordZodSchema,
    CreateUserZodSchema,
    UpdateUserZodSchema,
};
