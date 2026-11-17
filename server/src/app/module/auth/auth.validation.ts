import z from 'zod';

// ==========================================
// Common Validations
// ==========================================

// Password Validation
const passwordValidation = z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter.')
    .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter.')
    .regex(/[0-9]/, 'Password must contain at least 1 number.')
    .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least 1 special character.',
    );

// Name Validation
const nameValidation = z
    .string('Name must be a string.')
    .trim()
    .min(3, 'Name must be at least 3 characters long.')
    .max(30, 'Name cannot exceed 30 characters.');

// Email Validation
const emailValidation = z.email('Invalid email address.');

// OTP Validation
const otpValidation = z.string().length(6, 'OTP must be exactly 6 digits.');

// User Role
const userRoleValidation = z.enum([
    'SUPER_ADMIN',
    'ADMIN',
    'TEACHER',
    'STUDENT',
]);

// User Status
const userStatusValidation = z.enum([
    'ACTIVE',
    'INACTIVE',
    'BLOCKED',
    'DELETED',
]);

// ==========================================
// User Registration
// ==========================================

const UserRegistrationZodSchema = z.object({
    name: nameValidation,

    email: emailValidation,

    password: passwordValidation,

    class: z.enum(['SSC', 'HSC']).optional(),

    student: z
        .object({
            contactNumber: z.string().optional(),
        })
        .optional(),
});

// ==========================================
// User Email Verification
// ==========================================

const UserEmailVerifyZodSchema = z.object({
    email: emailValidation,

    otp: otpValidation,
});

// ==========================================
// User Login
// ==========================================

const LoginZodSchema = z.object({
    email: emailValidation,

    password: z.string().min(8, 'Password must be at least 8 characters long.'),
});

// ==========================================
// Forgot Password
// ==========================================

const ForgotPasswordZodSchema = z.object({
    email: emailValidation,
});

// ==========================================
// Reset Password
// ==========================================

const ResetPasswordZodSchema = z.object({
    email: emailValidation,

    newPassword: passwordValidation,

    otp: otpValidation,
});

// ==========================================
// Create User (Admin)
// ==========================================

const CreateUserZodSchema = z.object({
    name: nameValidation,

    email: emailValidation,

    password: passwordValidation,

    role: userRoleValidation.optional(),

    status: userStatusValidation.optional(),

    emailVerified: z.boolean().optional(),

    needPasswordChange: z.boolean().optional(),

    imageUrl: z.string().optional(),

    imagePublicId: z.string().optional(),
});

// ==========================================
// Update User
// ==========================================

const UpdateUserZodSchema = z.object({
    name: nameValidation.optional(),

    email: emailValidation.optional(),

    role: userRoleValidation.optional(),

    status: userStatusValidation.optional(),

    emailVerified: z.boolean().optional(),

    needPasswordChange: z.boolean().optional(),

    imageUrl: z.string().optional(),

    imagePublicId: z.string().optional(),
});

// ==========================================
// Export All User Validations
// ==========================================

export const UserValidation = {
    UserRegistrationZodSchema,
    UserEmailVerifyZodSchema,
    LoginZodSchema,
    ForgotPasswordZodSchema,
    ResetPasswordZodSchema,
    CreateUserZodSchema,
    UpdateUserZodSchema,
};
