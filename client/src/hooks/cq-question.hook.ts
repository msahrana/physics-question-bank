import {
    useMutation,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    ICreateCQQuestion,
    IUpdateCQQuestion,
    ICQQuestionQuery,
} from '@/interface';
import {
    createCQQuestion,
    deleteCQQuestion,
    getAllCQQuestions,
    updateCQQuestion,
} from '@/api';

// Create CQ Question
export function useCreateCQQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ICreateCQQuestion) => createCQQuestion(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cq-questions'],
            });
        },
    });
}

// Get All CQ Questions
export function useSuspenseGetAllCQQuestions(params?: ICQQuestionQuery) {
    return useSuspenseQuery({
        queryKey: ['cq-questions', params],
        queryFn: () => getAllCQQuestions(params),
    });
}

// Update CQ Question
export function useUpdateCQQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: string;
            payload: IUpdateCQQuestion;
        }) => updateCQQuestion(id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cq-questions'],
            });
        },
    });
}

// Delete CQ Question
export function useDeleteCQQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteCQQuestion(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cq-questions'],
            });
        },
    });
}
