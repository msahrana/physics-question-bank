import { z } from 'zod';

// Enums
export const shortQuestionDifficultySchema = z.enum(['EASY', 'MEDIUM', 'HARD']);

export const shortQuestionStatusSchema = z.enum([
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED',
]);

export const shortQuestionLanguageSchema = z.enum(['bn', 'en']);

// Content
export const shortQuestionContentSchema = z.object({
    type: z.string().optional(),
    content: z.string().trim().min(1, 'Content is required'),
    language: shortQuestionLanguageSchema,
});

// Create
export const createShortQuestionSchema = z.object({
    chapterId: z.string().uuid('Invalid chapter ID'),

    question: shortQuestionContentSchema,

    questionText: z.string().trim().optional(),

    answer: shortQuestionContentSchema,

    answerText: z.string().trim().optional(),

    explanation: shortQuestionContentSchema.optional(),

    explanationText: z.string().trim().optional(),

    difficulty: shortQuestionDifficultySchema.default('EASY'),

    status: shortQuestionStatusSchema.default('DRAFT'),

    isPremium: z.boolean().default(false),

    source: z.string().trim().optional().nullable(),

    sourceYear: z.number().int().positive().optional().nullable(),

    sortOrder: z.number().int().default(0),

    photoUrl: z.string().url().optional().nullable(),
});

// Update
export const updateShortQuestionSchema = z.object({
    chapterId: z.string().uuid().optional(),

    question: shortQuestionContentSchema.optional(),

    questionText: z.string().trim().optional().nullable(),

    answer: shortQuestionContentSchema.optional(),

    answerText: z.string().trim().optional().nullable(),

    explanation: shortQuestionContentSchema.optional().nullable(),

    explanationText: z.string().trim().optional().nullable(),

    difficulty: shortQuestionDifficultySchema.optional(),

    status: shortQuestionStatusSchema.optional(),

    isPremium: z.boolean().optional(),

    source: z.string().trim().optional().nullable(),

    sourceYear: z.number().int().positive().optional().nullable(),

    sortOrder: z.number().int().optional(),

    photoUrl: z.string().url().optional().nullable(),
});

// Query
export const shortQuestionQuerySchema = z.object({
    searchTerm: z.string().optional(),

    chapterId: z.string().uuid().optional(),

    difficulty: shortQuestionDifficultySchema.optional(),

    status: shortQuestionStatusSchema.optional(),

    isPremium: z.enum(['true', 'false']).optional(),

    page: z.coerce.number().int().positive().optional(),

    limit: z.coerce.number().int().positive().optional(),

    sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Bulk Create
export const bulkCreateShortQuestionSchema = z.object({
    questions: z
        .array(createShortQuestionSchema)
        .min(1, 'At least one question is required'),
});

// Export inferred types
export type ICreateShortQuestion = z.infer<typeof createShortQuestionSchema>;

export type IUpdateShortQuestion = z.infer<typeof updateShortQuestionSchema>;

export type IShortQuestionQuery = z.infer<typeof shortQuestionQuerySchema>;

export type IBulkCreateShortQuestion = z.infer<
    typeof bulkCreateShortQuestionSchema
>;
