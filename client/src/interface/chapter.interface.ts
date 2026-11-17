export interface ICreateChapter {
    title: string;
    chapterNo: number;
    courseId: string;
    description?: string | null;
    thumbnail?: string | null;
    isPublished?: boolean;
    sortOrder?: number;
}

export interface IUpdateChapter {
    title?: string;
    chapterNo?: number;
    courseId?: string;
    description?: string | null;
    thumbnail?: string | null;
    isPublished?: boolean;
    sortOrder?: number;
}

export interface IChapter {
    id: string;
    title: string;
    slug: string;
    chapterNo: number;
    description: string | null;
    thumbnail: string | null;
    isPublished: boolean;
    sortOrder: number;
    courseId: string;
    createdById: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IChapterMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IChapterQuery {
    courseId?: string;
    searchTerm?: string;
    isPublished?: 'true' | 'false';
    page?: number;
    limit?: number;
    sortOrder?: 'asc' | 'desc';
}

// API Responses
export interface IChapterResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IChapter[];
    meta: IChapterMeta;
}

export interface ISingleChapterResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IChapter;
}
