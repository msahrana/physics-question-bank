import { z } from 'zod';

// Create Chapter Validation
const createChapterValidation = z.object({
    body: z.object({
        title: z.string().trim().min(1, 'Chapter title is required'),

        chapterNo: z
            .number()
            .int('Chapter number must be an integer')
            .positive('Chapter number must be positive'),

        courseId: z.uuid('Invalid course ID'),

        description: z.string().optional().nullable(),

        thumbnail: z
            .string()
            .url('Invalid thumbnail URL')
            .optional()
            .nullable(),

        isPublished: z.boolean().optional(),

        sortOrder: z.number().int().optional(),
    }),
});

// Update Chapter Validation
const updateChapterValidation = z.object({
    body: z
        .object({
            title: z.string().trim().min(1).optional(),

            slug: z
                .string()
                .trim()
                .min(1)
                .regex(
                    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                    'Slug must contain lowercase letters, numbers and hyphens',
                )
                .optional(),

            chapterNo: z.number().int().positive().optional(),

            description: z.string().optional().nullable(),

            thumbnail: z.string().url().optional().nullable(),

            isPublished: z.boolean().optional(),

            sortOrder: z.number().int().optional(),
        })
        .strict()
        .refine(
            (data) => Object.keys(data).length > 0,
            'At least one field is required',
        ),
});

// Get All Chapters Query Validation
const chapterQueryValidation = z.object({
    query: z.object({
        searchTerm: z.string().optional(),

        courseId: z.uuid('Invalid course ID').optional(),

        isPublished: z.enum(['true', 'false']).optional(),

        page: z.coerce.number().int().positive().optional(),

        limit: z.coerce.number().int().positive().optional(),

        sortOrder: z.enum(['asc', 'desc']).optional(),
    }),
});

// Export Validations
export const ChapterValidations = {
    createChapterValidation,
    updateChapterValidation,
    chapterQueryValidation,
};
