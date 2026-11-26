import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Providers from '@/providers';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
    display: 'swap',
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default:
            'Physics Question Bank | Beyond Questions, Towards Excellence.',
        template: '%s | Physics Question Bank',
    },
    description:
        'Physics Question Bank – Beyond Questions, Towards Excellence.',
    applicationName: 'Physics Question Bank',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                'h-full',
                'antialiased',
                geistSans.variable,
                geistMono.variable,
                inter.variable,
                'font-sans',
            )}
        >
            <body className="flex min-h-full flex-col">
                <Providers>
                    <AuthenticatedLayout>{children}</AuthenticatedLayout>
                </Providers>
            </body>
        </html>
    );
}
