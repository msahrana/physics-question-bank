import {
    ShortQuestionDifficulty,
    ShortQuestionLanguage,
    ShortQuestionStatus,
} from '@/types';

export interface ICreateShortQuestion {
    title: string;
}

export interface IGetShortQuestion {
    title: string;
}

export interface IShortQuestionParams {
    title: string;
}

// Content
export interface IShortQuestionContent {
    type?: string;
    content: string;
    language: ShortQuestionLanguage;
}

// Create
export interface ICreateShortQuestion {
    chapterId: string;

    question: IShortQuestionContent;
    questionText?: string;

    answer: IShortQuestionContent;
    answerText?: string;

    explanation?: IShortQuestionContent;
    explanationText?: string;

    difficulty?: ShortQuestionDifficulty;
    status?: ShortQuestionStatus;
    isPremium?: boolean;

    source?: string | null;
    sourceYear?: number | null;

    sortOrder?: number;
    photoUrl?: string | null;
}

// Update
export interface IUpdateShortQuestion {
    chapterId?: string;

    question?: IShortQuestionContent;
    questionText?: string | null;

    answer?: IShortQuestionContent;
    answerText?: string | null;

    explanation?: IShortQuestionContent | null;
    explanationText?: string | null;

    difficulty?: ShortQuestionDifficulty;
    status?: ShortQuestionStatus;
    isPremium?: boolean;

    source?: string | null;
    sourceYear?: number | null;

    sortOrder?: number;
    photoUrl?: string | null;
}

// Query
export interface IShortQuestionQuery {
    searchTerm?: string;
    chapterId?: string;

    difficulty?: ShortQuestionDifficulty;
    status?: ShortQuestionStatus;

    isPremium?: boolean | 'true' | 'false';

    page?: number;
    limit?: number;

    sortOrder?: 'asc' | 'desc';
}

// Bulk Create
export interface IBulkCreateShortQuestion {
    questions: ICreateShortQuestion[];
}

// Chapter
export interface IShortQuestionChapter {
    id: string;
    chapterNo: number;
    title: string;
}

// Created By
export interface IShortQuestionCreatedBy {
    id: string;
    name: string;
    email: string;
}

// Single Question Item
export interface IShortQuestionItem {
    id: string;

    question: IShortQuestionContent;
    questionText: string | null;

    answer: IShortQuestionContent;
    answerText: string | null;

    explanation: IShortQuestionContent | null;
    explanationText: string | null;

    difficulty: ShortQuestionDifficulty;
    status: ShortQuestionStatus;

    isPremium: boolean;

    source: string | null;
    sourceYear: number | null;

    sortOrder: number;
    publishedAt: string | null;

    photoUrl: string | null;

    chapterId: string;
    createdById: string | null;

    createdAt: string;
    updatedAt: string;

    chapter: IShortQuestionChapter;

    createdBy: IShortQuestionCreatedBy | null;
}

// Meta
export interface IShortQuestionMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

// List Response
export interface IShortQuestionResponse {
    success: boolean;
    statusCode: number;
    message: string;

    data: IShortQuestionItem[];
    meta: IShortQuestionMeta;
}

// Single Response
export interface ISingleShortQuestionResponse {
    success: boolean;
    statusCode: number;
    message: string;

    data: IShortQuestionItem;
}
