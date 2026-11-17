import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    createMCQQuestion,
    createMCQQuestionBulk,
    getAllMCQQuestions,
    updateMCQQuestion,
    deleteMCQQuestion,
} from '@/api';

import {
    ICreateMCQQuestion,
    IUpdateMCQQuestion,
    IBulkCreateMCQQuestion,
    IMCQQuestionQuery,
} from '@/interface';

// ========================================
// Create Single MCQ
// ========================================

export function useCreateMCQQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ICreateMCQQuestion) => createMCQQuestion(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['mcq-questions'],
            });
        },
    });
}

// ========================================
// Bulk Create MCQ
// ========================================

export function useCreateMCQQuestionBulk() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: IBulkCreateMCQQuestion) =>
            createMCQQuestionBulk(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['mcq-questions'],
            });
        },
    });
}

// ========================================
// Get All MCQ Questions
// ========================================

export function useSuspenseGetAllMCQQuestions(params?: IMCQQuestionQuery) {
    return useSuspenseQuery({
        queryKey: ['mcq-questions', params],
        queryFn: () => getAllMCQQuestions(params),
    });
}

// ========================================
// Update MCQ Question
// ========================================

export function useUpdateMCQQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: string;
            payload: IUpdateMCQQuestion;
        }) => updateMCQQuestion(id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['mcq-questions'],
            });
        },
    });
}

// ========================================
// Delete MCQ Question
// ========================================

export function useDeleteMCQQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteMCQQuestion(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['mcq-questions'],
            });
        },
    });
}
