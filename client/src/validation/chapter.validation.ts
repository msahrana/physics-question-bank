import { z } from 'zod';

// Create Chapter Schema
export const createChapterSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'Chapter title is required')
        .max(150, 'Chapter title cannot exceed 150 characters'),

    chapterNo: z
        .number()
        .int('Chapter number must be an integer')
        .positive('Chapter number must be greater than 0'),

    courseId: z.string().uuid('Invalid course ID'),

    description: z.string().trim().nullable().optional(),

    thumbnail: z.string().url('Invalid thumbnail URL').nullable().optional(),

    isPublished: z.boolean().optional(),

    sortOrder: z.number().int().min(0).optional(),
});

// Update Chapter Schema
export const updateChapterSchema = z
    .object({
        title: z.string().trim().min(1).max(150).optional(),

        chapterNo: z.number().int().positive().optional(),

        courseId: z.string().uuid().optional(),

        description: z.string().trim().nullable().optional(),

        thumbnail: z.string().url().nullable().optional(),

        isPublished: z.boolean().optional(),

        sortOrder: z.number().int().min(0).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field is required to update',
    });

// Chapter Query Schema
export const chapterQuerySchema = z.object({
    courseId: z.string().uuid().optional(),

    searchTerm: z.string().optional(),

    isPublished: z.enum(['true', 'false']).optional(),

    page: z.coerce.number().int().positive().optional(),

    limit: z.coerce.number().int().positive().optional(),

    sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Inferred Types
export type CreateChapterInput = z.infer<typeof createChapterSchema>;

export type UpdateChapterInput = z.infer<typeof updateChapterSchema>;

export type ChapterQueryInput = z.infer<typeof chapterQuerySchema>;
