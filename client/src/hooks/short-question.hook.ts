import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    createShortQuestion,
    createShortQuestionBulk,
    getAllShortQuestions,
    getSingleShortQuestion,
    updateShortQuestion,
    deleteShortQuestion,
} from '@/api';

import {
    ICreateShortQuestion,
    IBulkCreateShortQuestion,
    IShortQuestionQuery,
    IUpdateShortQuestion,
} from '@/interface';

// Create Short Question
export function useCreateShortQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ICreateShortQuestion) =>
            createShortQuestion(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['short-questions'],
            });
        },
    });
}

// Bulk Create Short Questions
export function useCreateShortQuestionBulk() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: IBulkCreateShortQuestion) =>
            createShortQuestionBulk(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['short-questions'],
            });
        },
    });
}

// Get All Short Questions
export function useSuspenseGetAllShortQuestions(params?: IShortQuestionQuery) {
    return useSuspenseQuery({
        queryKey: ['short-questions', params],
        queryFn: () => getAllShortQuestions(params),
    });
}

// Get Single Short Question
export function useSuspenseGetSingleShortQuestion(id: string) {
    return useSuspenseQuery({
        queryKey: ['short-questions', id],
        queryFn: () => getSingleShortQuestion(id),
    });
}

// Update Short Question
export function useUpdateShortQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: string;
            payload: IUpdateShortQuestion;
        }) => updateShortQuestion(id, payload),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['short-questions'],
            });

            queryClient.invalidateQueries({
                queryKey: ['short-questions', variables.id],
            });
        },
    });
}

// Delete Short Question
export function useDeleteShortQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteShortQuestion(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['short-questions'],
            });
        },
    });
}
