export type IMCQContentBlock =
    | {
          type: 'paragraph';
          content: string;
      }
    | {
          type: 'image';
          url: string;
          alt?: string;
          caption?: string;
      }
    | {
          type: 'math';
          latex: string;
      }
    | {
          type: 'table';
          headers: string[];
          rows: string[][];
      };

export interface IMCQQuestionContent {
    blocks: IMCQContentBlock[];
}

export interface IMCQOption {
    text: IMCQQuestionContent;
    textPlain?: string;
    isCorrect: boolean;
    sortOrder: number;
}

export interface ICreateMCQQuestion {
    chapterId: string;
    questionNo?: number;

    question: IMCQQuestionContent;
    questionText?: string;

    explanation?: IMCQQuestionContent;
    explanationText?: string;

    options: IMCQOption[];

    // Other existing fields...
}

export interface IBulkCreateMCQQuestion {
    chapterId: string;
    questions: Omit<ICreateMCQQuestion, 'chapterId'>[];
    createdById?: string;
}
