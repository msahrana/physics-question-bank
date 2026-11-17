import { Prisma } from '../../../../generated/prisma/client';
import httpStatus from 'http-status';

import { AppError } from '../../utils/AppError';
import { prisma } from '../../lib/prisma';
import type { IBulkCreateMCQQuestion } from './mcq-question.interface';

// Common include
const mcqInclude = {
    options: {
        orderBy: {
            sortOrder: 'asc' as const,
        },
    },
    chapter: {
        select: {
            id: true,
        },
    },
    stimulus: true,
    createdBy: {
        select: {
            id: true,
            name: true,
            email: true,
        },
    },
};

// Create Single MCQ Question
const createMCQQuestionIntoDB = async (payload: any) => {
    const { options, question, explanation, ...questionData } = payload;

    // Check chapter exists
    const chapter = await prisma.chapter.findUnique({
        where: {
            id: questionData.chapterId,
        },
        select: {
            id: true,
        },
    });

    if (!chapter) {
        throw new AppError(httpStatus.NOT_FOUND, 'Chapter not found');
    }

    const result = await prisma.mCQQuestion.create({
        data: {
            ...questionData,
            question: question as Prisma.InputJsonValue,
            ...(explanation !== undefined && {
                explanation: explanation as Prisma.InputJsonValue,
            }),
            options: {
                create: options.map((option: any) => ({
                    ...option,
                    text: option.text as Prisma.InputJsonValue,
                })),
            },
        },
        include: mcqInclude,
    });

    return result;
};

// Create Bulk MCQ Questions
const createBulkMCQQuestionIntoDB = async (payload: IBulkCreateMCQQuestion) => {
    const { chapterId, questions, createdById } = payload;

    const result = await prisma.$transaction(
        async (tx) => {
            const createdQuestions = [];

            for (const item of questions) {
                const { options, question, explanation, ...questionData } =
                    item;

                const created = await tx.mCQQuestion.create({
                    data: {
                        ...questionData,

                        question: question as unknown as Prisma.InputJsonValue,

                        ...(explanation && {
                            explanation:
                                explanation as unknown as Prisma.InputJsonValue,
                        }),

                        chapterId,
                        createdById,

                        options: {
                            create: options.map((option) => ({
                                ...option,
                                text: option.text as unknown as Prisma.InputJsonValue,
                            })),
                        },
                    },
                });

                createdQuestions.push(created);
            }

            return createdQuestions;
        },
        {
            maxWait: 10000,
            timeout: 30000,
        },
    );

    return result;
};

// Get All MCQ Questions

const getAllMCQQuestionsFromDB = async (filters: any) => {
    const {
        searchTerm,
        chapterId,
        stimulusId,
        difficulty,
        status,
        isPremium,
        page = 1,
        limit = 10,
    } = filters;

    const andConditions: Prisma.MCQQuestionWhereInput[] = [];

    // Search
    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    questionText: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                {
                    explanationText: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
            ],
        });
    }

    // Filters
    if (chapterId) {
        andConditions.push({ chapterId });
    }

    if (stimulusId) {
        andConditions.push({ stimulusId });
    }

    if (difficulty) {
        andConditions.push({ difficulty });
    }

    if (status) {
        andConditions.push({ status });
    }

    if (isPremium !== undefined) {
        andConditions.push({
            isPremium:
                typeof isPremium === 'string'
                    ? isPremium === 'true'
                    : isPremium,
        });
    }

    const where: Prisma.MCQQuestionWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    // Pagination
    const currentPage = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Number(limit) || 10);

    const skip = (currentPage - 1) * pageSize;

    // Fetch data and total count
    const [data, total] = await Promise.all([
        prisma.mCQQuestion.findMany({
            where,
            skip,
            take: pageSize,
            include: mcqInclude,
            orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        }),

        prisma.mCQQuestion.count({
            where,
        }),
    ]);

    // Meta
    return {
        data,
        meta: {
            page: currentPage,
            limit: pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
        },
    };
};

// Get Single MCQ Question
const getSingleMCQQuestionFromDB = async (id: string) => {
    const result = await prisma.mCQQuestion.findUnique({
        where: { id },
        include: mcqInclude,
    });

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'MCQ Question not found');
    }

    return result;
};

// Update MCQ Question
const updateMCQQuestionIntoDB = async (id: string, payload: any) => {
    const existingQuestion = await prisma.mCQQuestion.findUnique({
        where: { id },
        select: { id: true },
    });

    if (!existingQuestion) {
        throw new AppError(httpStatus.NOT_FOUND, 'MCQ Question not found');
    }

    const { options, question, explanation, ...questionData } = payload;

    const result = await prisma.$transaction(async (tx) => {
        // Replace options if provided
        if (options !== undefined) {
            await tx.mCQOption.deleteMany({
                where: { questionId: id },
            });
        }

        const updated = await tx.mCQQuestion.update({
            where: { id },
            data: {
                ...questionData,
                ...(question !== undefined && {
                    question: question as Prisma.InputJsonValue,
                }),
                ...(explanation !== undefined && {
                    explanation: explanation as Prisma.InputJsonValue,
                }),
                ...(options !== undefined && {
                    options: {
                        create: options.map((option: any) => ({
                            ...option,
                            text: option.text as Prisma.InputJsonValue,
                        })),
                    },
                }),
            },
            include: mcqInclude,
        });

        return updated;
    });

    return result;
};

// Delete MCQ Question
const deleteMCQQuestionFromDB = async (id: string) => {
    const existingQuestion = await prisma.mCQQuestion.findUnique({
        where: { id },
        select: { id: true },
    });

    if (!existingQuestion) {
        throw new AppError(httpStatus.NOT_FOUND, 'MCQ Question not found');
    }

    await prisma.mCQQuestion.delete({
        where: { id },
    });

    return null;
};

export const MCQQuestionServices = {
    createMCQQuestionIntoDB,
    createBulkMCQQuestionIntoDB,
    getAllMCQQuestionsFromDB,
    getSingleMCQQuestionFromDB,
    updateMCQQuestionIntoDB,
    deleteMCQQuestionFromDB,
};
