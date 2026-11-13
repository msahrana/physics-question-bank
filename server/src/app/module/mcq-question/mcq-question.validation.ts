import { z } from 'zod';

import { Difficulty, QuestionStatus } from '../../../../generated/prisma/enums';

// ========================================
// 1. MCQ Content Block Schema
// ========================================

const mcqContentBlockSchema = z.discriminatedUnion('type', [
    z.object({
        type: z.literal('paragraph'),
        content: z.string().min(1),
    }),

    z.object({
        type: z.literal('image'),
        url: z.string().url(),
        alt: z.string().optional(),
        caption: z.string().optional(),
    }),

    z.object({
        type: z.literal('math'),
        latex: z.string().min(1),
    }),

    z.object({
        type: z.literal('table'),
        headers: z.array(z.string()),
        rows: z.array(z.array(z.string())),
    }),
]);

const mcqQuestionContentSchema = z.object({
    blocks: z.array(mcqContentBlockSchema).min(1),
});

// ========================================
// 2. MCQ Option Schema
// ========================================

const mcqOptionSchema = z.object({
    text: mcqQuestionContentSchema,
    textPlain: z.string().optional(),
    isCorrect: z.boolean().default(false),
    sortOrder: z.number().int().min(0),
});

const optionsSchema = z
    .array(mcqOptionSchema)
    .length(4, 'Exactly four options are required')
    .refine(
        (options) => options.filter((option) => option.isCorrect).length <= 1,
        {
            message: 'At most one option can be correct',
        },
    )
    .refine(
        (options) =>
            new Set(options.map((option) => option.sortOrder)).size ===
            options.length,
        {
            message: 'Option sortOrder must be unique',
        },
    );

// ========================================
// 3. Create MCQ Schema
// ========================================

const createMCQQuestionSchema = z.object({
    body: z.object({
        chapterId: z.string().uuid(),

        questionNo: z.number().int().positive().optional(),

        question: mcqQuestionContentSchema,
        questionText: z.string().optional(),

        explanation: mcqQuestionContentSchema.optional(),
        explanationText: z.string().optional(),

        difficulty: z.enum(Difficulty).optional(),
        status: z.enum(QuestionStatus).optional(),
        isPremium: z.boolean().optional(),

        source: z.string().optional(),
        sourceYear: z.number().int().optional(),
        sortOrder: z.number().int().optional(),

        publishedAt: z.coerce.date().optional(),

        stimulusId: z.string().uuid().optional(),

        options: optionsSchema,
    }),
});

// ========================================
// 4. Bulk Create MCQ Schema
// ========================================

const bulkCreateMCQQuestionSchema = z.object({
    body: z.object({
        chapterId: z.string().uuid(),

        questions: z
            .array(
                createMCQQuestionSchema.shape.body.omit({
                    chapterId: true,
                }),
            )
            .min(1, 'At least one question is required'),
    }),
});

// ========================================
// 5. Update MCQ Schema
// ========================================

const updateMCQQuestionSchema = z.object({
    params: z.object({
        id: z.string().uuid(),
    }),

    body: z
        .object({
            question: mcqQuestionContentSchema.optional(),
            questionText: z.string().optional(),

            explanation: mcqQuestionContentSchema.optional(),
            explanationText: z.string().optional(),

            difficulty: z.enum(Difficulty).optional(),
            status: z.enum(QuestionStatus).optional(),
            isPremium: z.boolean().optional(),

            source: z.string().optional(),
            sourceYear: z.number().int().optional(),
            sortOrder: z.number().int().optional(),

            stimulusId: z.string().uuid().nullable().optional(),

            options: optionsSchema.optional(),
        })
        .refine((data) => Object.keys(data).length > 0, {
            message: 'At least one field is required',
        }),
});

// ========================================
// 6. Get All MCQ Schema
// ========================================

const getAllMCQQuestionsSchema = z.object({
    query: z.object({
        chapterId: z.string().uuid().optional(),

        stimulusId: z.string().uuid().optional(),

        difficulty: z.enum(Difficulty).optional(),
        status: z.enum(QuestionStatus).optional(),

        isPremium: z
            .enum(['true', 'false'])
            .transform((value) => value === 'true')
            .optional(),

        searchTerm: z.string().optional(),

        page: z.coerce.number().int().positive().optional(),
        limit: z.coerce.number().int().positive().optional(),
    }),
});

// ========================================
// 7. Get Single / Delete MCQ Schema
// ========================================

const mcqQuestionIdSchema = z.object({
    params: z.object({
        id: z.string().uuid(),
    }),
});

// ========================================
// 8. Export Validation
// ========================================

export const MCQQuestionValidation = {
    createMCQQuestionSchema,
    bulkCreateMCQQuestionSchema,
    updateMCQQuestionSchema,
    getAllMCQQuestionsSchema,
    mcqQuestionIdSchema,
};
