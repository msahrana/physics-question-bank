import { Prisma } from '../../../../generated/prisma/client';
import { prisma } from '../../lib/prisma';
import type {
    ICourseQuery,
    ICreateCourse,
    IUpdateCourse,
} from './course.interface';

// Create Course
const createCourseIntoDB = async (payload: ICreateCourse) => {
    const existingCourse = await prisma.course.findUnique({
        where: {
            slug: payload.slug,
        },
    });

    if (existingCourse) {
        throw new Error('Course slug already exists!');
    }

    const result = await prisma.course.create({
        data: {
            title: payload.title,
            slug: payload.slug,
            description: payload.description,
            thumbnail: payload.thumbnail,
            accessType: payload.accessType,
            isPublished: payload.isPublished,
            sortOrder: payload.sortOrder,
        },
        include: {
            _count: {
                select: {
                    chapters: true,
                },
            },
        },
    });

    return result;
};

// Get All Courses
const getAllCoursesFromDB = async (query: ICourseQuery) => {
    const {
        searchTerm,
        accessType,
        isPublished,
        page = 1,
        limit = 10,
        sortOrder = 'asc',
    } = query;

    const skip = (page - 1) * limit;

    const andConditions: Prisma.CourseWhereInput[] = [];

    // Search
    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                {
                    slug: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                },
            ],
        });
    }

    // Filter by Access Type
    if (accessType) {
        andConditions.push({
            accessType,
        });
    }

    // Filter by Published Status
    if (isPublished !== undefined) {
        andConditions.push({
            isPublished,
        });
    }

    const where: Prisma.CourseWhereInput = {
        AND: andConditions,
    };

    const [data, total] = await Promise.all([
        prisma.course.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                sortOrder,
            },
            include: {
                _count: {
                    select: {
                        chapters: true,
                    },
                },
            },
        }),

        prisma.course.count({
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

// Get Single Course
const getSingleCourseFromDB = async (id: string) => {
    const result = await prisma.course.findUnique({
        where: {
            id,
        },
        include: {
            chapters: {
                orderBy: {
                    chapterNo: 'asc',
                },
            },
            _count: {
                select: {
                    chapters: true,
                },
            },
        },
    });

    if (!result) {
        throw new Error('Course not found!');
    }

    return result;
};

// Update Course
const updateCourseIntoDB = async (id: string, payload: IUpdateCourse) => {
    const course = await prisma.course.findUnique({
        where: {
            id,
        },
    });

    if (!course) {
        throw new Error('Course not found!');
    }

    // Check duplicate slug
    if (payload.slug && payload.slug !== course.slug) {
        const existingCourse = await prisma.course.findUnique({
            where: {
                slug: payload.slug,
            },
        });

        if (existingCourse) {
            throw new Error('Course slug already exists!');
        }
    }

    const result = await prisma.course.update({
        where: {
            id,
        },
        data: payload,
        include: {
            _count: {
                select: {
                    chapters: true,
                },
            },
        },
    });

    return result;
};

// Delete Course
const deleteCourseFromDB = async (id: string) => {
    const course = await prisma.course.findUnique({
        where: {
            id,
        },
    });

    if (!course) {
        throw new Error('Course not found!');
    }

    // Prevent deletion if chapters exist
    const chapterCount = await prisma.chapter.count({
        where: {
            courseId: id,
        },
    });

    if (chapterCount > 0) {
        throw new Error('Cannot delete course because chapters already exist!');
    }

    const result = await prisma.course.delete({
        where: {
            id,
        },
    });

    return result;
};

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
};
