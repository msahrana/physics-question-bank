import { Prisma } from '../../../../generated/prisma/client';

import httpStatus from 'http-status';

import type {
    ICreateShortQuestion,
    IUpdateShortQuestion,
    IShortQuestionFilters,
} from './short-question.interface';
import { prisma } from '../../lib/prisma';
import { AppError } from '../../utils/AppError';

// ==========================================
// CREATE SHORT QUESTION
// ==========================================

const createShortQuestionIntoDB = async (payload: ICreateShortQuestion) => {
    const {
        chapterId,
        createdById,
        question,
        answer,
        explanation,
        ...questionData
    } = payload;

    // Check chapter exists
    const chapter = await prisma.chapter.findUnique({
        where: {
            id: chapterId,
        },
        select: {
            id: true,
        },
    });

    if (!chapter) {
        throw new AppError(httpStatus.NOT_FOUND, 'Chapter not found!');
    }

    const result = await prisma.shortQuestion.create({
        data: {
            ...questionData,

            question: question as Prisma.InputJsonValue,

            ...(answer !== undefined && {
                answer: answer as Prisma.InputJsonValue,
            }),

            ...(explanation !== undefined && {
                explanation: explanation as Prisma.InputJsonValue,
            }),

            chapter: {
                connect: {
                    id: chapterId,
                },
            },

            ...(createdById && {
                createdBy: {
                    connect: {
                        id: createdById,
                    },
                },
            }),
        },

        include: {
            chapter: {
                select: {
                    id: true,
                    chapterNo: true,
                    title: true,
                },
            },

            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return result;
};

// ==========================================
// GET ALL SHORT QUESTIONS
// ==========================================

const getAllShortQuestionsFromDB = async (filters: IShortQuestionFilters) => {
    const { searchTerm, chapterId, difficulty, status, isPremium } = filters;

    // Convert query params to number
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 10;

    const skip = (page - 1) * limit;

    const andConditions: Prisma.ShortQuestionWhereInput[] = [];

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
                    answerText: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
            ],
        });
    }

    // Chapter filter
    if (chapterId) {
        andConditions.push({
            chapterId,
        });
    }

    // Difficulty filter
    if (difficulty) {
        andConditions.push({
            difficulty,
        });
    }

    // Status filter
    if (status) {
        andConditions.push({
            status,
        });
    }

    // Premium filter
    if (isPremium !== undefined) {
        andConditions.push({
            isPremium,
        });
    }

    const whereConditions: Prisma.ShortQuestionWhereInput =
        andConditions.length > 0
            ? {
                  AND: andConditions,
              }
            : {};

    // Get data and total count
    const [data, total] = await prisma.$transaction([
        prisma.shortQuestion.findMany({
            where: whereConditions,

            skip,
            take: limit,

            orderBy: [
                {
                    sortOrder: 'asc',
                },
                {
                    createdAt: 'desc',
                },
            ],

            include: {
                chapter: {
                    select: {
                        id: true,
                        chapterNo: true,
                        title: true,
                    },
                },

                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        }),

        prisma.shortQuestion.count({
            where: whereConditions,
        }),
    ]);

    return {
        data,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

// ==========================================
// GET SINGLE SHORT QUESTION
// ==========================================

const getSingleShortQuestionFromDB = async (id: string) => {
    const result = await prisma.shortQuestion.findUnique({
        where: {
            id,
        },

        include: {
            chapter: {
                select: {
                    id: true,
                    chapterNo: true,
                    title: true,
                },
            },

            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Short question not found!');
    }

    return result;
};

// ==========================================
// UPDATE SHORT QUESTION
// ==========================================

const updateShortQuestionIntoDB = async (
    id: string,
    payload: IUpdateShortQuestion,
) => {
    const existingQuestion = await prisma.shortQuestion.findUnique({
        where: {
            id,
        },

        select: {
            id: true,
        },
    });

    if (!existingQuestion) {
        throw new AppError(httpStatus.NOT_FOUND, 'Short question not found!');
    }

    const { chapterId, question, answer, explanation, ...questionData } =
        payload;

    // Check chapter if chapterId is updated
    if (chapterId) {
        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId,
            },

            select: {
                id: true,
            },
        });

        if (!chapter) {
            throw new AppError(httpStatus.NOT_FOUND, 'Chapter not found!');
        }
    }

    const result = await prisma.shortQuestion.update({
        where: {
            id,
        },

        data: {
            ...questionData,

            ...(question !== undefined && {
                question: question as Prisma.InputJsonValue,
            }),

            ...(answer !== undefined && {
                answer:
                    answer === null
                        ? Prisma.JsonNull
                        : (answer as Prisma.InputJsonValue),
            }),

            ...(explanation !== undefined && {
                explanation:
                    explanation === null
                        ? Prisma.JsonNull
                        : (explanation as Prisma.InputJsonValue),
            }),

            ...(chapterId && {
                chapter: {
                    connect: {
                        id: chapterId,
                    },
                },
            }),
        },

        include: {
            chapter: {
                select: {
                    id: true,
                    chapterNo: true,
                    title: true,
                },
            },

            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return result;
};

// ==========================================
// DELETE SHORT QUESTION
// ==========================================

const deleteShortQuestionFromDB = async (id: string) => {
    const existingQuestion = await prisma.shortQuestion.findUnique({
        where: {
            id,
        },

        select: {
            id: true,
        },
    });

    if (!existingQuestion) {
        throw new AppError(httpStatus.NOT_FOUND, 'Short question not found!');
    }

    const result = await prisma.shortQuestion.delete({
        where: {
            id,
        },
    });

    return result;
};

// ==========================================
// EXPORT SERVICES
// ==========================================

export const ShortQuestionServices = {
    createShortQuestionIntoDB,
    getAllShortQuestionsFromDB,
    getSingleShortQuestionFromDB,
    updateShortQuestionIntoDB,
    deleteShortQuestionFromDB,
};
