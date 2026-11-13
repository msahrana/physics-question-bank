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
    title: string;
    chapterNo: number;
}
