import {
    useMutation,
    useSuspenseQuery,
    useQueryClient,
} from '@tanstack/react-query';

import {
    createChapter,
    getAllChapters,
    updateChapter,
    deleteChapter,
} from '@/api';

import { ICreateChapter, IChapterQuery, IUpdateChapter } from '@/interface';

// Create Chapter
export function useCreateChapter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ICreateChapter) => createChapter(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['chapters'],
            });
        },
    });
}

// Get All Chapters
export function useSuspenseGetAllChapters(params?: IChapterQuery) {
    return useSuspenseQuery({
        queryKey: ['chapters', params],
        queryFn: () => getAllChapters(params),
    });
}

// Update Chapter
export function useUpdateChapter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: string;
            payload: IUpdateChapter;
        }) => updateChapter(id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['chapters'],
            });
        },
    });
}

// Delete Chapter
export function useDeleteChapter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteChapter(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['chapters'],
            });
        },
    });
}
