'use client';

import { createContext, useContext, type ReactNode } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useGetMe, useLogout } from '@/hooks/auth.hook';
import type { IUser } from '@/interface';

interface IAuthContext {
    user: IUser | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    const { data, isPending, isError, refetch } = useGetMe();

    const logoutMutation = useLogout();

    // ofetch returns the parsed JSON response directly.
    const user: IUser | null = isError ? null : (data?.data ?? null);

    const logout = async () => {
        await logoutMutation.mutateAsync();
        queryClient.setQueryData(['user'], null);
    };

    const refreshUser = async () => {
        await refetch();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading: isPending,
                isLoggedIn: !!user,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
}
