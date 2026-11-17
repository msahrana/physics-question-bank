import Link from 'next/link';

import {
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    ArrowUpRight,
    BookOpen,
} from 'lucide-react';

import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import CurrentYear from './CurrentYear';

const quickLinks = [
    { title: 'Home', href: '/' },
    { title: 'About Us', href: '/about' },
    { title: 'All Courses', href: '/courses' },
    { title: 'Contact Us', href: '/contact' },
];

const courseLinks = [
    {
        title: 'Secondary Physics',
        href: '/courses/secondary-physics',
    },
    {
        title: 'HSC Physics 1st Paper',
        href: '/courses/higher-secondary-physics-1st-paper',
    },
    {
        title: 'HSC Physics 2nd Paper',
        href: '/courses/higher-secondary-physics-2nd-paper',
    },
];

const questionLinks = [
    {
        title: 'MCQ Questions',
        href: '/courses/secondary-physics/mcq',
    },
    {
        title: 'CQ Questions',
        href: '/courses/secondary-physics/cq',
    },
    {
        title: 'Short Questions',
        href: '/courses/secondary-physics/short-questions',
    },
];

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-300">
            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="mb-6 inline-flex items-center gap-3"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                                <GraduationCap size={29} />
                            </div>

                            <div>
                                <h2 className="text-xl font-extrabold tracking-tight text-white">
                                    Physics
                                    <span className="text-blue-500">
                                        {' '}
                                        Academy
                                    </span>
                                </h2>

                                <p className="text-[10px] font-medium tracking-[0.2em] text-slate-500">
                                    LEARN • PRACTICE • ACHIEVE
                                </p>
                            </div>
                        </Link>

                        <p className="max-w-sm text-sm leading-7 text-slate-400">
                            Making Physics simple, interesting, and accessible
                            for every student. Learn concepts, practice
                            questions, and prepare confidently for your
                            examinations.
                        </p>

                        {/* Social Links */}
                        <div className="mt-7">
                            <p className="mb-3 text-sm font-semibold text-white">
                                Follow Us
                            </p>

                            <div className="flex items-center gap-3">
                                <a
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                                >
                                    <FaFacebookF size={18} />
                                </a>

                                <a
                                    href="https://www.youtube.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="YouTube"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-red-500 hover:bg-red-600 hover:text-white"
                                >
                                    <FaYoutube size={18} />
                                </a>

                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-pink-500 hover:bg-pink-600 hover:text-white"
                                >
                                    <FaInstagram size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-6 text-base font-bold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-400"
                                    >
                                        <span>{link.title}</span>

                                        <ArrowUpRight
                                            size={14}
                                            className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Courses */}
                    <div>
                        <h3 className="mb-6 text-base font-bold text-white">
                            Our Courses
                        </h3>

                        <ul className="space-y-4">
                            {courseLinks.map((course) => (
                                <li key={course.href}>
                                    <Link
                                        href={course.href}
                                        className="text-sm leading-6 text-slate-400 transition hover:text-blue-400"
                                    >
                                        {course.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Question Categories */}
                    <div>
                        <h3 className="mb-6 text-base font-bold text-white">
                            Practice Questions
                        </h3>

                        <ul className="space-y-4">
                            {questionLinks.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-slate-400 transition hover:text-blue-400"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-14 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
                        {/* Email */}
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                                <Mail size={21} />
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-white">
                                    Email Us
                                </h4>

                                <a
                                    href="mailto:your-email@example.com"
                                    className="mt-1 block text-sm text-slate-400 transition hover:text-blue-400"
                                >
                                    your-email@example.com
                                </a>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                                <Phone size={21} />
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-white">
                                    Call Us
                                </h4>

                                <p className="mt-1 text-sm text-slate-400">
                                    Add your contact number
                                </p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                                <MapPin size={21} />
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-white">
                                    Our Location
                                </h4>

                                <p className="mt-1 text-sm text-slate-400">
                                    Bangladesh
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-slate-800">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:px-6 md:flex-row lg:px-8">
                    <p className="text-sm text-slate-500">
                        © <CurrentYear /> Physics Academy. All rights reserved.
                    </p>

                    <p className="flex items-center gap-2 text-sm text-slate-500">
                        <BookOpen size={15} />
                        Empowering Students Through Education
                    </p>

                    <Link
                        href="/"
                        className="text-sm font-medium text-slate-400 transition hover:text-blue-400"
                    >
                        Back to Home ↑
                    </Link>
                </div>
            </div>
        </footer>
    );
}
