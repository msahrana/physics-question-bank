import { z } from 'zod';

import {
    Difficulty,
    QuestionStatus,
    CQPartType,
} from '../../../../generated/prisma/enums';

// CQ Part Schema
const cqPartSchema = z.object({
    label: z.string().trim().min(1, 'Part label is required'),

    type: z.enum(CQPartType),

    question: z.json(),

    answer: z.json().optional(),
});

// Create CQ Question Schema
const createCQQuestionSchema = z.object({
    questionNo: z.number().int().positive(),

    question: z.object({
        type: z.literal('CREATIVE'),

        language: z.enum(['bn', 'en']).default('bn'),

        stimulus: z.object({
            content: z.string().trim().min(1),
        }),

        parts: z.array(cqPartSchema).min(1),
    }),

    chapterId: z.uuid(),

    difficulty: z.enum(Difficulty).default(Difficulty.MEDIUM),

    status: z.enum(QuestionStatus).default(QuestionStatus.DRAFT),

    isPremium: z.boolean().default(false),
});

// Update CQ Question Schema
const updateCQQuestionSchema = z
    .object({
        question: z.json().optional(),

        questionText: z.string().trim().nullable().optional(),

        difficulty: z.enum(Difficulty).optional(),

        status: z.enum(QuestionStatus).optional(),

        isPremium: z.boolean().optional(),

        source: z.string().trim().nullable().optional(),

        sourceYear: z.number().int().nullable().optional(),

        sortOrder: z.number().int().optional(),

        publishedAt: z.coerce.date().nullable().optional(),

        photoUrl: z.url().nullable().optional(),

        chapterId: z.uuid().optional(),

        stimulusId: z.uuid().nullable().optional(),

        parts: z.array(cqPartSchema).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field is required to update',
    });

// Get All CQ Questions Query Schema
const getAllCQQuestionsSchema = z.object({
    query: z.object({
        searchTerm: z.string().optional(),

        chapterId: z.uuid().optional(),

        stimulusId: z.uuid().optional(),

        difficulty: z.enum(Difficulty).optional(),

        status: z.enum(QuestionStatus).optional(),

        isPremium: z.enum(['true', 'false']).optional(),

        page: z.coerce.number().int().min(1).default(1),

        limit: z.coerce.number().int().min(1).max(100).default(10),
    }),
});

// Bulk Create CQ Questions Schema
const bulkCreateCQQuestionSchema = z.object({
    chapterId: z.uuid(),

    questions: z
        .array(
            z.object({
                question: z.json(),

                questionText: z.string().optional(),

                difficulty: z.enum(Difficulty).optional(),

                status: z.enum(QuestionStatus).optional(),

                isPremium: z.boolean().optional(),

                source: z.string().optional(),

                sourceYear: z.number().int().optional(),

                sortOrder: z.number().int().optional(),

                publishedAt: z.coerce.date().optional(),

                photoUrl: z.url().optional(),

                stimulusId: z.uuid().optional(),

                parts: z.array(cqPartSchema).optional(),
            }),
        )
        .min(1, 'At least one question is required'),
});

export const CQQuestionValidation = {
    createCQQuestionSchema,
    updateCQQuestionSchema,
    getAllCQQuestionsSchema,
    bulkCreateCQQuestionSchema,
};
