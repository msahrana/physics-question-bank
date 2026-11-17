import { prisma } from '../../lib/prisma';
import httpStatus from 'http-status';

import { AppError } from '../../utils/AppError';

import type {
    ICreateChapter,
    IUpdateChapter,
    IChapterQuery,
} from './chapter.interface';

// Create Chapter
const createChapterIntoDB = async (payload: ICreateChapter) => {
    // Check Course ID
    if (!payload.courseId) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Course ID is required!');
    }

    // Check Course
    const course = await prisma.course.findUnique({
        where: {
            id: payload.courseId,
        },
    });

    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
    }

    // Create Chapter
    const result = await prisma.chapter.create({
        data: {
            title: payload.title,
            chapterNo: payload.chapterNo,
            slug: `chapter-${payload.chapterNo}`,
            courseId: payload.courseId,
            description: payload.description,
            thumbnail: payload.thumbnail,
            isPublished: payload.isPublished,
            sortOrder: payload.sortOrder,
        },
    });

    return result;
};

// Get All Chapters
const getAllChaptersIntoDB = async (query: IChapterQuery) => {
    const { searchTerm, courseId, isPublished, sortOrder = 'asc' } = query;

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Number(query.limit) || 10);

    const skip = (page - 1) * limit;

    const where = {
        ...(courseId && { courseId }),

        ...(isPublished !== undefined && {
            isPublished: isPublished === 'true',
        }),

        ...(searchTerm && {
            OR: [
                {
                    title: {
                        contains: searchTerm,
                        mode: 'insensitive' as const,
                    },
                },
                {
                    slug: {
                        contains: searchTerm,
                        mode: 'insensitive' as const,
                    },
                },
            ],
        }),
    };

    const [data, total] = await Promise.all([
        prisma.chapter.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                sortOrder,
                // asc or desc
            },
        }),

        prisma.chapter.count({
            where,
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

// Get Single Chapter
const getSingleChapterIntoDB = async (id: string) => {
    const result = await prisma.chapter.findUnique({
        where: {
            id,
        },
    });

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Chapter not found!');
    }

    return result;
};

// Update Chapter
const updateChapterIntoDB = async (id: string, payload: IUpdateChapter) => {
    // Check Chapter
    const existingChapter = await prisma.chapter.findUnique({
        where: {
            id,
        },
    });

    if (!existingChapter) {
        throw new AppError(httpStatus.NOT_FOUND, 'Chapter not found!');
    }

    // Check Course if courseId is provided
    if (payload.courseId) {
        const course = await prisma.course.findUnique({
            where: {
                id: payload.courseId,
            },
        });

        if (!course) {
            throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
        }
    }

    // Update Chapter
    const result = await prisma.chapter.update({
        where: {
            id,
        },
        data: {
            ...(payload.title !== undefined && {
                title: payload.title,
            }),

            ...(payload.chapterNo !== undefined && {
                chapterNo: payload.chapterNo,
                slug: `chapter-${payload.chapterNo}`,
            }),

            ...(payload.courseId !== undefined && {
                courseId: payload.courseId,
            }),

            ...(payload.description !== undefined && {
                description: payload.description,
            }),

            ...(payload.thumbnail !== undefined && {
                thumbnail: payload.thumbnail,
            }),

            ...(payload.isPublished !== undefined && {
                isPublished: payload.isPublished,
            }),

            ...(payload.sortOrder !== undefined && {
                sortOrder: payload.sortOrder,
            }),
        },
    });

    return result;
};

// Delete Chapter
const deleteChapterIntoDB = async (id: string) => {
    // Check Chapter
    const existingChapter = await prisma.chapter.findUnique({
        where: {
            id,
        },
    });

    if (!existingChapter) {
        throw new AppError(httpStatus.NOT_FOUND, 'Chapter not found!');
    }

    // Delete Chapter
    const result = await prisma.chapter.delete({
        where: {
            id,
        },
    });

    return result;
};

export const ChapterServices = {
    createChapterIntoDB,
    getAllChaptersIntoDB,
    getSingleChapterIntoDB,
    updateChapterIntoDB,
    deleteChapterIntoDB,
};
