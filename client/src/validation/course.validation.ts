import { z } from 'zod';

// Create Course Schema
export const createCourseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'Title is required')
        .max(100, 'Title cannot exceed 100 characters'),

    slug: z
        .string()
        .trim()
        .min(1, 'Slug is required')
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'Slug must contain lowercase letters, numbers and hyphens',
        ),

    description: z.string().optional().nullable(),

    thumbnail: z
        .string()
        .url('Please provide a valid thumbnail URL')
        .optional()
        .nullable(),

    accessType: z.enum(['FREE', 'PAID']).optional(),

    isPublished: z.boolean().optional(),

    sortOrder: z.number().int().min(0).optional(),
});

// Update Course Schema
export const updateCourseSchema = z
    .object({
        title: z.string().trim().min(1).max(100).optional(),

        slug: z
            .string()
            .trim()
            .min(1)
            .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
            .optional(),

        description: z.string().optional().nullable(),

        thumbnail: z.string().url().optional().nullable(),

        accessType: z.enum(['FREE', 'PAID']).optional(),

        isPublished: z.boolean().optional(),

        sortOrder: z.number().int().min(0).optional(),
    })
    .strict()
    .refine(
        (data) => Object.keys(data).length > 0,
        'At least one field is required',
    );

// Course Query Schema
export const courseQuerySchema = z.object({
    searchTerm: z.string().optional(),

    accessType: z.enum(['FREE', 'PAID']).optional(),

    isPublished: z.enum(['true', 'false']).optional(),

    page: z.coerce.number().int().positive().optional(),

    limit: z.coerce.number().int().positive().optional(),

    sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Inferred Types
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type CourseQueryInput = z.infer<typeof courseQuerySchema>;
