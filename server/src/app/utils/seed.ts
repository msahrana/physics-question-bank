import bcrypt from 'bcryptjs';

import { UserRole, UserStatus } from '../../../generated/prisma/enums';

import config from '../config';
import { prisma } from '../lib/prisma';
import { AppError } from './AppError';
import httpStatus from 'http-status';

// Common Seeder Function
const createSeedUser = async ({
    name,
    email,
    password,
    role,
}: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}) => {
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    });

    if (existingUser) {
        console.log(`${role} Already Exists!`);
        return;
    }

    const hashedPassword = await bcrypt.hash(
        password,
        Number(config.bcrypt_salt_rounds),
    );

    const user = await prisma.user.create({
        data: {
            name,
            email: normalizedEmail,
            role,
            status: UserStatus.ACTIVE,
            emailVerified: true,
            needPasswordChange: false,
            imageUrl: '',
            imagePublicId: '',

            accounts: {
                create: {
                    provider: 'CREDENTIAL',
                    providerAccountId: normalizedEmail,
                    passwordHash: hashedPassword,
                },
            },
        },
    });

    console.log(`${role} Created Successfully:`, user.email);
};

// Create Super Admin
export const seedSuperAdmin = async () => {
    try {
        const { super_admin_name, super_admin_email, super_admin_password } =
            config;

        if (!super_admin_name || !super_admin_email || !super_admin_password) {
            throw new AppError(
                httpStatus.INTERNAL_SERVER_ERROR,
                'Super Admin Name, Email, Password Missing In Env File!',
            );
        }

        await createSeedUser({
            name: super_admin_name,
            email: super_admin_email,
            password: super_admin_password,
            role: UserRole.SUPER_ADMIN,
        });
    } catch (error) {
        console.error('Error Seeding Super Admin:', error);
    }
};

// Create Tester Admin
export const seedTesterAdmin = async () => {
    try {
        const { tester_admin_name, tester_admin_email, tester_admin_password } =
            config;

        if (
            !tester_admin_name ||
            !tester_admin_email ||
            !tester_admin_password
        ) {
            throw new AppError(
                httpStatus.INTERNAL_SERVER_ERROR,
                'Tester Admin Name, Email, Password Missing In Env File!',
            );
        }

        await createSeedUser({
            name: tester_admin_name,
            email: tester_admin_email,
            password: tester_admin_password,
            role: UserRole.ADMIN,
        });
    } catch (error) {
        console.error('Error Seeding Tester Admin:', error);
    }
};

// Create Tester Teacher
export const seedTesterTeacher = async () => {
    try {
        const {
            tester_teacher_name,
            tester_teacher_email,
            tester_teacher_password,
        } = config;

        if (
            !tester_teacher_name ||
            !tester_teacher_email ||
            !tester_teacher_password
        ) {
            throw new AppError(
                httpStatus.INTERNAL_SERVER_ERROR,
                'Tester Teacher Name, Email, Password Missing In Env File!',
            );
        }

        await createSeedUser({
            name: tester_teacher_name,
            email: tester_teacher_email,
            password: tester_teacher_password,
            role: UserRole.TEACHER,
        });
    } catch (error) {
        console.error('Error Seeding Tester Teacher:', error);
    }
};
