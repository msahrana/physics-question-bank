import { CQPartType, QuestionDifficulty, QuestionStatus } from '@/types';

// Flexible JSON type
export type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonValue[]
    | { [key: string]: JsonValue };

// Question content
export interface ICQContent {
    content: string;
    language?: 'bn' | 'en';
}

// Stimulus table
export interface ICQTable {
    headers: string[];
    rows: JsonValue[][];
}

// Stimulus
export interface ICQStimulus {
    content: string;
    table?: ICQTable;
}

// CQ Part
export interface ICQPart {
    label: string;
    type: CQPartType;
    question: ICQContent;
    answer?: ICQContent;
    marks?: number;
}

// Main CQ Question JSON
export interface ICQQuestion {
    type: 'CREATIVE';
    language: 'bn' | 'en';
    stimulus: ICQStimulus;
    parts: ICQPart[];
}

// Create CQ Question
export interface ICreateCQQuestion {
    chapterId: string;
    questionNo: number;
    question: ICQQuestion;
    difficulty?: QuestionDifficulty;
    status?: QuestionStatus;
    isPremium?: boolean;
    source?: string | null;
    sourceYear?: number | null;
    sortOrder?: number;
    photoUrl?: string | null;
}

// Update CQ Question
export interface IUpdateCQQuestion {
    chapterId?: string;
    questionNo?: number;
    question?: ICQQuestion;
    difficulty?: QuestionDifficulty;
    status?: QuestionStatus;
    isPremium?: boolean;
    source?: string | null;
    sourceYear?: number | null;
    sortOrder?: number;
    publishedAt?: string | null;
    photoUrl?: string | null;
}

// Query Parameters
export interface ICQQuestionQuery {
    searchTerm?: string;
    chapterId?: string;
    stimulusId?: string;
    difficulty?: QuestionDifficulty;
    status?: QuestionStatus;
    isPremium?: 'true' | 'false';
    page?: number;
    limit?: number;
}

// Bulk Create
export interface IBulkCreateCQQuestion {
    chapterId: string;
    questions: Omit<ICreateCQQuestion, 'chapterId'>[];
}

// CQ Question Response Part
// API response may contain either string or object content.
export interface ICQResponsePart {
    label: string;
    type?: CQPartType;
    question: JsonValue;
    answer?: JsonValue;
    marks?: number;
}

// CQ Question Response JSON
export interface ICQQuestionData {
    type: 'CREATIVE';
    language: 'bn' | 'en';
    stimulus: ICQStimulus;
    parts: ICQResponsePart[];
}

// Chapter information
export interface ICQChapterInfo {
    id: string;
    title: string;
}

// CQ Question
export interface ICQQuestionItem {
    id: string;
    questionNo: number;
    question: ICQQuestionData;
    questionText: string | null;
    difficulty: QuestionDifficulty;
    status: QuestionStatus;
    isPremium: boolean;
    source: string | null;
    sourceYear: number | null;
    sortOrder: number;
    publishedAt: string | null;
    photoUrl: string | null;
    chapterId: string;
    stimulusId: string | null;
    createdById: string | null;
    createdAt: string;
    updatedAt: string;

    chapter: ICQChapterInfo;
    stimulus: ICQStimulus | null;
    parts: ICQResponsePart[];
    createdBy: JsonValue | null;

    _count: {
        parts: number;
    };
}

// Pagination Meta
export interface ICQQuestionMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

// Get All CQ Questions Response
export interface ICQQuestionResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: ICQQuestionItem[];
    meta: ICQQuestionMeta;
}

// Single CQ Question Response
export interface ISingleCQQuestionResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: ICQQuestionItem;
}
