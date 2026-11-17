import { CourseAccessType } from '@/types';

export interface ICreateCourse {
    title: string;
    slug: string;
    description?: string | null;
    thumbnail?: string | null;
    accessType?: CourseAccessType;
    isPublished?: boolean;
    sortOrder?: number;
}

export interface IUpdateCourse {
    title?: string;
    slug?: string;
    description?: string | null;
    thumbnail?: string | null;
    accessType?: CourseAccessType;
    isPublished?: boolean;
    sortOrder?: number;
}

export interface ICourse {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    thumbnail: string | null;
    accessType: CourseAccessType;
    isPublished: boolean;
    sortOrder: number;
    createdById: string | null;
    createdAt: string;
    updatedAt: string;

    _count: {
        chapters: number;
    };
}

export interface ICourseMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ICourseQuery {
    searchTerm?: string;
    accessType?: CourseAccessType;
    isPublished?: 'true' | 'false';
    page?: number;
    limit?: number;
    sortOrder?: 'asc' | 'desc';
}

export interface ICourseResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        data: ICourse[];
        meta: ICourseMeta;
    };
}

export interface ISingleCourseResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: ICourse;
}
