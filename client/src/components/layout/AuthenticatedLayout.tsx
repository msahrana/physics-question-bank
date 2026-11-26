'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toast';
import { useAuth } from '@/providers/AuthProvider';

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoggedIn, isLoading, logout } = useAuth();

    console.log('Auth state:', {
        user,
        isLoggedIn,
        isLoading,
    });

    return (
        <>
            {!isLoading && (
                <Navbar
                    isLoggedIn={isLoggedIn}
                    user={
                        user
                            ? {
                                  name: user.name,
                                  image: user.image,
                              }
                            : null
                    }
                    onLogout={logout}
                />
            )}

            <main className="flex-1">{children}</main>

            <Toaster />
            <Footer />
        </>
    );
}
