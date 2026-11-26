'use client';

import type { ReactNode } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';

import AuthProvider from './AuthProvider';
import GoogleAuthProvider from './google-auth.provider';
import QueryProvider from './query.provider';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <GoogleAuthProvider>
            <QueryProvider>
                <AuthProvider>
                    <TooltipProvider>{children}</TooltipProvider>
                </AuthProvider>
            </QueryProvider>
        </GoogleAuthProvider>
    );
}
