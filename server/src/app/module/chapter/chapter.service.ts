import { prisma } from '../../lib/prisma';
import type { ICreateChapter, IUpdateChapter } from './chapter.interface';

const createChapterIntoDB = async (payload: ICreateChapter) => {
    // Check payload
    console.log('Chapter Payload:', payload);
    console.log('Course ID:', payload.courseId);

    if (!payload.courseId) {
        throw new Error('Course ID is missing from request body!');
    }

    // Check Course
    const course = await prisma.course.findUnique({
        where: {
            id: payload.courseId,
        },
    });

    if (!course) {
        throw new Error('Course not found!');
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

const getAllChaptersIntoDB = async () => {};

const getSingleChapterIntoDB = async (id: string) => {};

const updateChapterIntoDB = async (id: string, payload: IUpdateChapter) => {};

const deleteChapterIntoDB = async (id: string) => {};

export const ChapterServices = {
    createChapterIntoDB,
    getAllChaptersIntoDB,
    getSingleChapterIntoDB,
    updateChapterIntoDB,
    deleteChapterIntoDB,
};
