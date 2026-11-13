import type {
    Difficulty,
    QuestionStatus,
} from '../../../../generated/prisma/enums';

export interface ICreateShortQuestion {
    chapterId: string;

    question: unknown;
    questionText?: string;

    answer?: unknown;
    answerText?: string;

    explanation?: unknown;
    explanationText?: string;

    difficulty?: Difficulty;
    status?: QuestionStatus;
    isPremium?: boolean;

    source?: string;
    sourceYear?: number;
    sortOrder?: number;

    publishedAt?: Date;
    photoUrl?: string;

    createdById?: string;
}

export interface IUpdateShortQuestion {
    chapterId?: string;

    question?: unknown;
    questionText?: string | null;

    answer?: unknown;
    answerText?: string | null;

    explanation?: unknown;
    explanationText?: string | null;

    difficulty?: Difficulty;
    status?: QuestionStatus;
    isPremium?: boolean;

    source?: string | null;
    sourceYear?: number | null;
    sortOrder?: number;

    publishedAt?: Date | null;
    photoUrl?: string | null;
}

export interface IShortQuestionFilters {
    searchTerm?: string;
    chapterId?: string;
    difficulty?: Difficulty;
    status?: QuestionStatus;
    isPremium?: boolean;

    page?: number;
    limit?: number;
}

export interface IShortQuestionMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
