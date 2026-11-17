import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
    email: z.string().trim().email('Please enter a valid email address'),

    password: z.string().min(1, 'Password is required'),
});

// Register Schema
export const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name cannot exceed 50 characters'),

        email: z.string().trim().email('Please enter a valid email address'),

        password: z.string().min(8, 'Password must be at least 8 characters'),

        confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

// Verify OTP Schema
export const verifyOTPSchema = z.object({
    email: z.string().trim().email('Please enter a valid email address'),

    otp: z
        .string()
        .length(6, 'OTP must be exactly 6 digits')
        .regex(/^\d{6}$/, 'OTP must contain only numbers'),
});

// Inferred Types
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type VerifyOTPInput = z.infer<typeof verifyOTPSchema>;
