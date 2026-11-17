import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toast';
import Footer from '@/components/layout/Footer';
import Providers from '@/providers';

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
        'Physics Question Bank – Beyond Questions, Towards Excellence. Explore Physics MCQ, CQ, short questions, practice tests, and study materials. Strengthen your concepts and prepare confidently for SSC and HSC examinations.',

    keywords: [
        'Physics Question Bank',
        'Physics MCQ',
        'Physics CQ',
        'Physics Short Questions',
        'SSC Physics',
        'HSC Physics',
        'Physics Practice Questions',
        'Physics Study Materials',
        'Physics Exam Preparation',
        'Physics Questions and Answers',
        'Bangladesh Physics Education',
    ],

    applicationName: 'Physics Question Bank',
    authors: [{ name: 'Physics Question Bank' }],
    creator: 'Physics Question Bank',
    publisher: 'Physics Question Bank',
    category: 'education',

    openGraph: {
        title: 'Physics Question Bank',
        description: 'Beyond Questions, Towards Excellence.',
        siteName: 'Physics Question Bank',
        type: 'website',
        locale: 'en_US',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Physics Question Bank',
        description: 'Beyond Questions, Towards Excellence.',
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
        },
    },
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
            <Providers>
                <body className="min-h-full flex flex-col">
                    <Navbar />
                    <main>{children}</main>

                    <Toaster />

                    <Footer />
                </body>
            </Providers>
        </html>
    );
}
