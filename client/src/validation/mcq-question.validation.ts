import { z } from 'zod';

// ========================================
// Enums
// ========================================

export const mcqDifficultySchema = z.enum(['EASY', 'MEDIUM', 'HARD']);

export const mcqStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

// ========================================
// Rich Text Content
// ========================================

export const mcqTextBlockSchema = z.object({
    type: z.string(),
    content: z.string(),
});

export const mcqRichTextSchema = z.object({
    blocks: z.array(mcqTextBlockSchema).min(1),
});

// ========================================
// MCQ Option
// ========================================

export const mcqOptionSchema = z.object({
    text: mcqRichTextSchema,
    textPlain: z.string().trim().min(1),
    isCorrect: z.boolean().default(false),
    sortOrder: z.number().int().min(1).optional(),
});

// ========================================
// Create MCQ Question
// ========================================

export const createMCQQuestionSchema = z.object({
    question: mcqRichTextSchema,

    questionText: z.string().trim().min(1),

    explanation: mcqRichTextSchema.nullable().optional(),

    explanationText: z.string().nullable().optional(),

    difficulty: mcqDifficultySchema.default('MEDIUM'),

    status: mcqStatusSchema.default('DRAFT'),

    isPremium: z.boolean().default(false),

    source: z.string().nullable().optional(),

    sourceYear: z.number().int().nullable().optional(),

    sortOrder: z.number().int().default(0),

    publishedAt: z.coerce.date().nullable().optional(),

    chapterId: z.string().uuid(),

    stimulusId: z.string().uuid().nullable().optional(),

    options: z.array(mcqOptionSchema).min(2).max(5),
});

// ========================================
// Update MCQ Question
// ========================================

export const updateMCQQuestionSchema = createMCQQuestionSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field is required',
    });

// ========================================
// MCQ Query Parameters
// ========================================

export const mcqQuestionQuerySchema = z.object({
    searchTerm: z.string().optional(),

    chapterId: z.string().uuid().optional(),

    stimulusId: z.string().uuid().optional(),

    difficulty: mcqDifficultySchema.optional(),

    status: mcqStatusSchema.optional(),

    isPremium: z.enum(['true', 'false']).optional(),

    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),
});

// ========================================
// Bulk Create MCQ
// ========================================

export const bulkCreateMCQQuestionSchema = z.object({
    chapterId: z.string().uuid(),

    questions: z
        .array(
            createMCQQuestionSchema.omit({
                chapterId: true,
            }),
        )
        .min(1),
});

// ========================================
// Inferred Types
// ========================================

export type ICreateMCQQuestionSchema = z.infer<typeof createMCQQuestionSchema>;

export type IUpdateMCQQuestionSchema = z.infer<typeof updateMCQQuestionSchema>;

export type IMCQQuestionQuerySchema = z.infer<typeof mcqQuestionQuerySchema>;

export type IBulkCreateMCQQuestionSchema = z.infer<
    typeof bulkCreateMCQQuestionSchema
>;
