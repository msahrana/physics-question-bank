import { Prisma } from '../../../../generated/prisma/client';
import { prisma } from '../../lib/prisma';
import { AppError } from '../../utils/AppError';
import { CQ_PART_LABEL_MAP } from './cq-question.constant';
import type {
    IBulkCreateCQQuestion,
    ICQQuestionFilterRequest,
    ICreateCQQuestion,
    IUpdateCQQuestion,
} from './cq-question.interface';
import httpStatus from 'http-status';

// ========================================
// Create CQ Question
// ========================================

const createCQQuestionIntoDB = async (payload: ICreateCQQuestion) => {
    const {
        parts,
        chapterId,
        stimulus,
        stimulusId,
        createdById,
        ...questionData
    } = payload;

    const result = await prisma.$transaction(
        async (tx) => {
            // Check chapter exists
            const chapter = await tx.chapter.findUnique({
                where: { id: chapterId },
                select: { id: true },
            });

            if (!chapter) {
                throw new AppError(httpStatus.NOT_FOUND, 'Chapter not found!');
            }

            // Get latest question number
            const lastQuestion = await tx.cQQuestion.aggregate({
                where: { chapterId },
                _max: {
                    questionNo: true,
                },
            });

            // Generate next question number
            const questionNo = (lastQuestion._max.questionNo ?? 0) + 1;

            // Create stimulus if provided
            let finalStimulusId = stimulusId;

            if (stimulus) {
                const createdStimulus = await tx.stimulus.create({
                    data: {
                        title: stimulus.title,
                        content: stimulus.content as Prisma.InputJsonValue,
                        contentText: stimulus.contentText,

                        chapter: {
                            connect: { id: chapterId },
                        },

                        ...(createdById && {
                            createdBy: {
                                connect: { id: createdById },
                            },
                        }),
                    },
                    select: {
                        id: true,
                    },
                });

                finalStimulusId = createdStimulus.id;
            }

            // Create CQ Question
            return await tx.cQQuestion.create({
                data: {
                    ...questionData,

                    questionNo,

                    question: questionData.question as Prisma.InputJsonValue,

                    chapter: {
                        connect: { id: chapterId },
                    },

                    ...(finalStimulusId && {
                        stimulus: {
                            connect: { id: finalStimulusId },
                        },
                    }),

                    ...(createdById && {
                        createdBy: {
                            connect: { id: createdById },
                        },
                    }),

                    ...(parts && {
                        parts: {
                            create: parts.map((part) => ({
                                label: CQ_PART_LABEL_MAP[part.type],
                                type: part.type,
                                question:
                                    part.question as Prisma.InputJsonValue,
                                answer:
                                    part.answer !== undefined
                                        ? (part.answer as Prisma.InputJsonValue)
                                        : Prisma.JsonNull,
                                questionText: part.questionText,
                                answerText: part.answerText,
                                sortOrder: part.sortOrder ?? 0,
                            })),
                        },
                    }),
                },

                include: {
                    chapter: true,
                    stimulus: true,
                    parts: {
                        orderBy: {
                            sortOrder: 'asc',
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
        },
        {
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
    );

    return result;
};

// ========================================
// Get All CQ Questions
// ========================================

const getAllCQQuestionsFromDB = async (filters: ICQQuestionFilterRequest) => {
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

    const skip = (page - 1) * limit;

    const andConditions: Prisma.CQQuestionWhereInput[] = [];

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
                    source: {
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
        andConditions.push({ isPremium });
    }

    const whereConditions: Prisma.CQQuestionWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const [data, total] = await prisma.$transaction([
        prisma.cQQuestion.findMany({
            where: whereConditions,

            skip,
            take: limit,

            orderBy: [{ questionNo: 'asc' }, { createdAt: 'desc' }],

            include: {
                chapter: {
                    select: {
                        id: true,
                        title: true,
                    },
                },

                stimulus: true,

                parts: {
                    orderBy: {
                        sortOrder: 'asc',
                    },
                },

                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },

                _count: {
                    select: {
                        parts: true,
                    },
                },
            },
        }),

        prisma.cQQuestion.count({
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

// ========================================
// Get Single CQ Question
// ========================================

const getSingleCQQuestionFromDB = async (id: string) => {
    const result = await prisma.cQQuestion.findUnique({
        where: { id },

        include: {
            chapter: true,
            stimulus: true,

            parts: {
                orderBy: {
                    type: 'asc',
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
        throw new AppError(404, 'CQ Question not found!');
    }

    return result;
};

// ========================================
// Update CQ Question
// ========================================

const updateCQQuestionIntoDB = async (
    id: string,
    payload: IUpdateCQQuestion,
) => {
    const { parts, chapterId, stimulusId, ...questionData } = payload;

    const existingQuestion = await prisma.cQQuestion.findUnique({
        where: { id },
        select: { id: true },
    });

    if (!existingQuestion) {
        throw new AppError(404, 'CQ Question not found!');
    }

    const result = await prisma.$transaction(async (tx) => {
        return tx.cQQuestion.update({
            where: { id },

            data: {
                ...questionData,

                ...(questionData.question !== undefined && {
                    question: questionData.question as Prisma.InputJsonValue,
                }),

                ...(chapterId && {
                    chapter: {
                        connect: { id: chapterId },
                    },
                }),

                ...(stimulusId !== undefined && {
                    stimulus: stimulusId
                        ? { connect: { id: stimulusId } }
                        : { disconnect: true },
                }),

                // Replace parts only when parts is provided
                ...(parts !== undefined && {
                    parts: {
                        deleteMany: {},

                        create: parts.map((part) => ({
                            label: CQ_PART_LABEL_MAP[part.type],
                            type: part.type,

                            question: part.question as Prisma.InputJsonValue,

                            answer:
                                part.answer !== undefined
                                    ? (part.answer as Prisma.InputJsonValue)
                                    : Prisma.JsonNull,
                        })),
                    },
                }),
            },

            include: {
                chapter: true,
                stimulus: true,
                parts: true,

                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    });

    return result;
};

// ========================================
// Delete CQ Question
// ========================================

const deleteCQQuestionFromDB = async (id: string) => {
    const existingQuestion = await prisma.cQQuestion.findUnique({
        where: { id },
        select: { id: true },
    });

    if (!existingQuestion) {
        throw new AppError(404, 'CQ Question not found!');
    }

    const result = await prisma.cQQuestion.delete({
        where: { id },
    });

    return result;
};

// ========================================
// Create Bulk CQ Question
// ========================================

const createBulkCQQuestionIntoDB = async (payload: IBulkCreateCQQuestion) => {
    const { chapterId, questions, createdById } = payload;

    const result = await prisma.$transaction(
        async (tx) => {
            // Check chapter exists
            const chapter = await tx.chapter.findUnique({
                where: { id: chapterId },
                select: { id: true },
            });

            if (!chapter) {
                throw new AppError(httpStatus.NOT_FOUND, 'Chapter not found');
            }

            // Get latest question number
            const lastQuestion = await tx.cQQuestion.aggregate({
                where: { chapterId },
                _max: {
                    questionNo: true,
                },
            });

            let nextQuestionNo = (lastQuestion._max.questionNo ?? 0) + 1;

            const createdQuestions = [];

            // Create questions sequentially
            for (const question of questions) {
                const { parts, stimulus, stimulusId, ...questionData } =
                    question;

                // Resolve stimulus ID
                let finalStimulusId = stimulusId;

                // Create a new stimulus if provided
                if (stimulus) {
                    const newStimulus = await tx.stimulus.create({
                        data: {
                            title: stimulus.title,
                            content: stimulus.content as Prisma.InputJsonValue,
                            contentText: stimulus.contentText,

                            chapter: {
                                connect: { id: chapterId },
                            },

                            ...(createdById && {
                                createdBy: {
                                    connect: { id: createdById },
                                },
                            }),
                        },
                        select: {
                            id: true,
                        },
                    });

                    finalStimulusId = newStimulus.id;
                }

                // Create CQ Question
                const createdQuestion = await tx.cQQuestion.create({
                    data: {
                        ...questionData,

                        questionNo: nextQuestionNo++,

                        question:
                            questionData.question as Prisma.InputJsonValue,

                        chapter: {
                            connect: { id: chapterId },
                        },

                        ...(finalStimulusId && {
                            stimulus: {
                                connect: { id: finalStimulusId },
                            },
                        }),

                        ...(createdById && {
                            createdBy: {
                                connect: { id: createdById },
                            },
                        }),

                        ...(parts && {
                            parts: {
                                create: parts.map((part) => ({
                                    label: CQ_PART_LABEL_MAP[part.type],
                                    type: part.type,

                                    question:
                                        part.question as Prisma.InputJsonValue,

                                    answer:
                                        part.answer !== undefined
                                            ? (part.answer as Prisma.InputJsonValue)
                                            : Prisma.JsonNull,

                                    questionText: part.questionText,
                                    answerText: part.answerText,
                                    sortOrder: part.sortOrder ?? 0,
                                })),
                            },
                        }),
                    },

                    include: {
                        chapter: true,
                        stimulus: true,
                        parts: {
                            orderBy: {
                                sortOrder: 'asc',
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

                createdQuestions.push(createdQuestion);
            }

            return createdQuestions;
        },
        {
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
    );

    return result;
};

// ========================================
// Export
// ========================================

export const CQQuestionServices = {
    createCQQuestionIntoDB,
    getAllCQQuestionsFromDB,
    getSingleCQQuestionFromDB,
    updateCQQuestionIntoDB,
    deleteCQQuestionFromDB,
    createBulkCQQuestionIntoDB,
};
