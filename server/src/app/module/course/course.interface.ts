import { AccessType } from '../../../../generated/prisma/enums';

// Create Course
export interface ICreateCourse {
    title: string;
    slug: string;
    description?: string | null;
    thumbnail?: string | null;
    accessType?: AccessType;
    isPublished?: boolean;
    sortOrder?: number;
}

// Update Course
export interface IUpdateCourse {
    title?: string;
    slug?: string;
    description?: string | null;
    thumbnail?: string | null;
    accessType?: AccessType;
    isPublished?: boolean;
    sortOrder?: number;
}

// Course
export interface ICourse {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    thumbnail: string | null;
    accessType: AccessType;
    isPublished: boolean;
    sortOrder: number;
    createdById: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// Course Query
export interface ICourseQuery {
    searchTerm?: string;
    accessType?: AccessType;
    isPublished?: boolean;
    page?: number;
    limit?: number;
    sortOrder?: 'asc' | 'desc';
}

// Pagination Meta
export interface ICourseMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

// Course with Chapter Count
export interface ICourseWithCount extends ICourse {
    _count: {
        chapters: number;
    };
}
