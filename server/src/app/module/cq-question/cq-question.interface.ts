import type { Prisma } from '../../../../generated/prisma/browser';
import {
    Difficulty,
    QuestionStatus,
    CQPartType,
} from '../../../../generated/prisma/enums';

export interface ICQPart {
    label: string;
    type: CQPartType;
    question: unknown;
    answer?: unknown;
    questionText?: string;
    answerText?: string;
    sortOrder?: number;
}

export interface ICreateCQStimulus {
    title?: string;
    content: unknown;
    contentText?: string;
}

export interface ICreateCQQuestion {
    question: unknown;
    questionText?: string;

    difficulty?: Difficulty;
    status?: QuestionStatus;
    isPremium?: boolean;

    source?: string;
    sourceYear?: number;
    sortOrder?: number;

    publishedAt?: Date;
    photoUrl?: string;

    chapterId: string;

    stimulus?: ICreateCQStimulus;
    stimulusId?: string;

    parts?: ICQPart[];

    createdById?: string;
}

export interface IUpdateCQQuestion {
    question?: Prisma.InputJsonValue;
    questionText?: string | null;

    difficulty?: Difficulty;
    status?: QuestionStatus;
    isPremium?: boolean;

    source?: string | null;
    sourceYear?: number | null;
    sortOrder?: number;

    publishedAt?: Date | null;
    photoUrl?: string | null;

    chapterId?: string;
    stimulusId?: string | null;

    parts?: ICQPart[];
}

export interface ICQQuestionFilterRequest {
    searchTerm?: string;
    chapterId?: string;
    stimulusId?: string;
    difficulty?: Difficulty;
    status?: QuestionStatus;
    isPremium?: boolean;
    page?: number;
    limit?: number;
}

export interface ICQQuestionMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ICQQuestionResponse {
    success: boolean;
    message: string;
    data: {
        data: unknown[];
        meta: ICQQuestionMeta;
    };
}

// export interface IBulkCreateCQQuestion {
//     chapterId: string;
//     createdById?: string;

//     questions: Omit<
//         ICreateCQQuestion,
//         'chapterId' | 'createdById'
//     >[];
// }

export interface IBulkCQQuestionItem extends Omit<
    ICreateCQQuestion,
    'chapterId' | 'createdById'
> {}

export interface IBulkCreateCQQuestion {
    chapterId: string;
    createdById?: string;
    questions: IBulkCQQuestionItem[];
}
