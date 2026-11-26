import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    getMe,
    googleOAuth,
    userLogin,
    userLogout,
    userRegistration,
    verifyAccount,
} from '@/api';

export function useRegister() {
    return useMutation({
        mutationFn: userRegistration,
    });
}

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userLogin,

        onSuccess: async () => {
            await queryClient.refetchQueries({
                queryKey: ['user'],
                type: 'active',
            });
        },
    });
}

export function useVerifyAccount() {
    return useMutation({
        mutationFn: verifyAccount,
    });
}

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userLogout,
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
            queryClient.removeQueries({
                queryKey: ['user'],
            });
        },
    });
}

export function useGoogleOAuth() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: googleOAuth,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },
    });
}

export function useGetMe() {
    return useQuery({
        queryKey: ['user'],
        queryFn: getMe,
        retry: false,
    });
}
