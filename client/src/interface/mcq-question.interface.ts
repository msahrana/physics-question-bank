import { MCQDifficulty, MCQStatus } from '@/types';

export interface IMCQTextBlock {
    type: string;
    content: string;
}

export interface IMCQRichText {
    blocks: IMCQTextBlock[];
}

// ========================================
// MCQ Option
// ========================================

export interface IMCQOption {
    id?: string;
    text: IMCQRichText;
    textPlain: string;
    isCorrect: boolean;
    sortOrder: number;
    questionId?: string;
}

// ========================================
// Create MCQ
// ========================================

export interface ICreateMCQQuestion {
    question: IMCQRichText;
    questionText: string;

    explanation?: IMCQRichText | null;
    explanationText?: string | null;

    difficulty?: MCQDifficulty;
    status?: MCQStatus;
    isPremium?: boolean;

    source?: string | null;
    sourceYear?: number | null;
    sortOrder?: number;

    publishedAt?: string | null;

    chapterId: string;
    stimulusId?: string | null;

    options: Omit<IMCQOption, 'id' | 'questionId'>[];
}

// ========================================
// Update MCQ
// ========================================

export type IUpdateMCQQuestion = Partial<ICreateMCQQuestion>;

// ========================================
// Query Parameters
// ========================================

export interface IMCQQuestionQuery {
    searchTerm?: string;
    chapterId?: string;
    stimulusId?: string;
    difficulty?: MCQDifficulty;
    status?: MCQStatus;
    isPremium?: boolean;
    page?: number;
    limit?: number;
}

// ========================================
// Bulk Create
// ========================================

export interface IBulkCreateMCQQuestion {
    chapterId: string;

    questions: Omit<ICreateMCQQuestion, 'chapterId'>[];
}

// ========================================
// Relations
// ========================================

export interface IMCQChapter {
    id: string;
}

export interface IMCQStimulus {
    id?: string;
}

export interface IMCQCreatedBy {
    id?: string;
    name?: string;
    email?: string;
}

// ========================================
// MCQ Question Response
// ========================================

export interface IMCQQuestionItem {
    id: string;

    question: IMCQRichText;
    questionText: string;

    explanation: IMCQRichText | null;
    explanationText: string | null;

    difficulty: MCQDifficulty;
    status: MCQStatus;
    isPremium: boolean;

    source: string | null;
    sourceYear: number | null;

    sortOrder: number;
    publishedAt: string | null;

    chapterId: string;
    stimulusId: string | null;
    createdById: string | null;

    createdAt: string;
    updatedAt: string;

    options: IMCQOption[];

    chapter: IMCQChapter;
    stimulus: IMCQStimulus | null;
    createdBy: IMCQCreatedBy | null;
}

// ========================================
// Pagination Meta
// ========================================

export interface IMCQQuestionMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

// ========================================
// API Responses
// ========================================

export interface IMCQQuestionResponse {
    success: boolean;
    statusCode: number;
    message: string;

    data: {
        data: IMCQQuestionItem[];
        meta: IMCQQuestionMeta;
    };
}

export interface ISingleMCQQuestionResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IMCQQuestionItem;
}
