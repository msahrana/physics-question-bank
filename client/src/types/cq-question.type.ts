export type CQPartType = 'GA' | 'GHA' | 'UMA' | 'CHA' | 'CHHA';

export type QuestionDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type QuestionStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type CQPart = {
    id?: string;
    label?: string;
    part?: string;
    questionNo?: string | number;
    text?: unknown;
    content?: unknown;
    questionText?: unknown;
    body?: unknown;
};

export type CQQuestion = {
    id: string;
    questionNo: number;
    difficulty?: string;
    status?: string;
    isPremium?: boolean;
    photoUrl?: string | null;

    chapter?: {
        id?: string;
        title?: string;
    };

    question?: {
        type?: string;
        language?: string;
        stimulus?: unknown;
        parts?: CQPart[];
    };
};

export type CQStimulusProps = {
    stimulus?: unknown;
    photoUrl?: string | null;
    questionNo: number;
};

export type CQQuestionPartsProps = {
    parts: CQPart[];
};

export type CQQuestionCardProps = {
    question: CQQuestion;
    index: number;
};
