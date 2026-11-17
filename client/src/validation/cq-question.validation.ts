import { z } from 'zod';

// CQ Part Type
export const cqPartTypeSchema = z.enum(['GA', 'GHA', 'UMA', 'CHA', 'CHHA']);

// Question Content Schema
const cqContentSchema = z.object({
    content: z.string().trim().min(1, 'Content is required'),
    language: z.enum(['bn', 'en']).optional(),
});

// Stimulus Table Schema
const cqTableSchema = z.object({
    headers: z.array(z.string()),
    rows: z.array(z.array(z.json())),
});

// Stimulus Schema
const cqStimulusSchema = z.object({
    content: z.string().trim().min(1, 'Stimulus content is required'),
    table: cqTableSchema.optional(),
});

// CQ Part Schema
const cqPartSchema = z.object({
    label: z.string().trim().min(1, 'Part label is required'),

    type: cqPartTypeSchema,

    question: cqContentSchema,

    answer: cqContentSchema.optional(),

    marks: z.number().int().positive().optional(),
});

// Main CQ Question JSON Schema
const cqQuestionSchema = z.object({
    type: z.literal('CREATIVE'),

    language: z.enum(['bn', 'en']).default('bn'),

    stimulus: cqStimulusSchema,

    parts: z.array(cqPartSchema).min(1, 'At least one part is required'),
});

// Create CQ Question Schema
export const createCQQuestionSchema = z.object({
    chapterId: z.string().uuid('Invalid chapter ID'),

    questionNo: z.number().int().positive(),

    question: cqQuestionSchema,

    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),

    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),

    isPremium: z.boolean().default(false),

    source: z.string().trim().nullable().optional(),

    sourceYear: z.number().int().nullable().optional(),

    sortOrder: z.number().int().optional(),

    photoUrl: z.string().url().nullable().optional(),
});

// Update CQ Question Schema
export const updateCQQuestionSchema = z
    .object({
        chapterId: z.string().uuid().optional(),

        questionNo: z.number().int().positive().optional(),

        question: cqQuestionSchema.optional(),

        difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),

        status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),

        isPremium: z.boolean().optional(),

        source: z.string().trim().nullable().optional(),

        sourceYear: z.number().int().nullable().optional(),

        sortOrder: z.number().int().optional(),

        publishedAt: z.coerce.date().nullable().optional(),

        photoUrl: z.string().url().nullable().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field is required to update',
    });

// CQ Question Query Schema
export const cqQuestionQuerySchema = z.object({
    searchTerm: z.string().optional(),

    chapterId: z.string().uuid().optional(),

    stimulusId: z.string().uuid().optional(),

    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),

    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),

    isPremium: z.enum(['true', 'false']).optional(),

    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),
});

// Bulk Create CQ Questions Schema
export const bulkCreateCQQuestionSchema = z.object({
    chapterId: z.string().uuid('Invalid chapter ID'),

    questions: z
        .array(
            z.object({
                questionNo: z.number().int().positive(),

                question: cqQuestionSchema,

                difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),

                status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),

                isPremium: z.boolean().optional(),

                source: z.string().nullable().optional(),

                sourceYear: z.number().int().nullable().optional(),

                sortOrder: z.number().int().optional(),

                photoUrl: z.string().url().nullable().optional(),
            }),
        )
        .min(1, 'At least one question is required'),
});

// Inferred Types
export type CreateCQQuestionInput = z.infer<typeof createCQQuestionSchema>;

export type UpdateCQQuestionInput = z.infer<typeof updateCQQuestionSchema>;

export type CQQuestionQueryInput = z.infer<typeof cqQuestionQuerySchema>;

export type BulkCreateCQQuestionInput = z.infer<
    typeof bulkCreateCQQuestionSchema
>;
