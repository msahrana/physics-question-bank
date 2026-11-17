import type { UserRole, UserStatus } from '../../../../generated/prisma/enums';

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    status?: UserStatus;
    emailVerified?: boolean;
    needPasswordChange?: boolean;
    imageUrl?: string;
    imagePublicId?: string;
    student?: {
        contactNumber?: string;
    };
}

export interface IUpdateUser {
    name?: string;
    email?: string;
    role?: UserRole;
    status?: UserStatus;
    emailVerified?: boolean;
    needPasswordChange?: boolean;
    imageUrl?: string;
    imagePublicId?: string;
    student?: {
        contactNumber?: string;
    };
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    role: UserRole;
    status: UserStatus;
    needPasswordChange: boolean;
    imageUrl: string;
    imagePublicId: string;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    student?: {
        contactNumber?: string;
    } | null;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IVerifyEmail {
    email: string;
    otp: string;
}

export interface IRequestUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface IGoogleLoginPayload {
    idToken: string;
}

export interface IForgotPasswordPayload {
    email: string;
}

export interface IResetPasswordPayload {
    email: string;
    otp: string;
    newPassword: string;
}