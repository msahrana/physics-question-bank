import { z } from 'zod';

import { AccessType } from '../../../../generated/prisma/enums';

// Create Course Validation
const createCourseValidation = z.object({
    title: z.string().trim().min(1, 'Title is required'),

    slug: z
        .string()
        .trim()
        .min(1, 'Slug is required')
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'Slug must contain lowercase letters, numbers and hyphens',
        ),

    description: z.string().optional().nullable(),

    thumbnail: z.string().url().optional().nullable(),

    accessType: z.enum(AccessType).optional(),

    isPublished: z.boolean().optional(),

    sortOrder: z.number().int().optional(),
});

// Update Course Validation
const updateCourseValidation = z
    .object({
        title: z.string().trim().min(1).optional(),

        slug: z
            .string()
            .trim()
            .min(1)
            .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
            .optional(),

        description: z.string().optional().nullable(),

        thumbnail: z.string().url().optional().nullable(),

        accessType: z.enum(AccessType).optional(),

        isPublished: z.boolean().optional(),

        sortOrder: z.number().int().optional(),
    })
    .strict()
    .refine(
        (data) => Object.keys(data).length > 0,
        'At least one field is required',
    );

// Course Query Validation
const courseQueryValidation = z.object({
    searchTerm: z.string().optional(),

    accessType: z.enum(AccessType).optional(),

    isPublished: z.enum(['true', 'false']).optional(),

    page: z.coerce.number().int().positive().optional(),

    limit: z.coerce.number().int().positive().optional(),

    sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const CourseValidations = {
    createCourseValidation,
    updateCourseValidation,
    courseQueryValidation,
};
