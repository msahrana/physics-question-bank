import z from 'zod';

import { Difficulty, QuestionStatus } from '../../../../generated/prisma/enums';

const createShortQuestionSchema = z.object({
    body: z.object({
        chapterId: z.uuid(),

        question: z.json(),
        questionText: z.string().optional(),

        answer: z.json().optional(),
        answerText: z.string().optional(),

        explanation: z.json().optional(),
        explanationText: z.string().optional(),

        difficulty: z.enum(Difficulty).optional(),
        status: z.enum(QuestionStatus).optional(),
        isPremium: z.boolean().optional(),

        source: z.string().optional(),
        sourceYear: z.number().int().positive().optional(),
        sortOrder: z.number().int().optional(),

        publishedAt: z.coerce.date().optional(),
        photoUrl: z.url().optional(),
    }),
});

const updateShortQuestionSchema = z.object({
    body: z.object({
        chapterId: z.uuid().optional(),

        question: z.json().optional(),
        questionText: z.string().nullable().optional(),

        answer: z.json().optional(),
        answerText: z.string().nullable().optional(),

        explanation: z.json().optional(),
        explanationText: z.string().nullable().optional(),

        difficulty: z.enum(Difficulty).optional(),
        status: z.enum(QuestionStatus).optional(),
        isPremium: z.boolean().optional(),

        source: z.string().nullable().optional(),
        sourceYear: z.number().int().positive().nullable().optional(),
        sortOrder: z.number().int().optional(),

        publishedAt: z.coerce.date().nullable().optional(),
        photoUrl: z.url().nullable().optional(),
    }),
});

const getAllShortQuestionsSchema = z.object({
    query: z.object({
        searchTerm: z.string().optional(),
        chapterId: z.uuid().optional(),

        difficulty: z.enum(Difficulty).optional(),
        status: z.enum(QuestionStatus).optional(),

        isPremium: z
            .enum(['true', 'false'])
            .transform((value) => value === 'true')
            .optional(),

        page: z.coerce.number().int().positive().optional(),
        limit: z.coerce.number().int().positive().optional(),
    }),
});

export const ShortQuestionValidation = {
    createShortQuestionSchema,
    updateShortQuestionSchema,
    getAllShortQuestionsSchema,
};
