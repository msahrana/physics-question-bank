'use client';

import Link from 'next/link';

import {
    ArrowRight,
    Atom,
    BookOpen,
    CheckCircle2,
    GraduationCap,
    PlayCircle,
    Sparkles,
    Target,
    Trophy,
} from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-white">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />
            </div>

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:gap-16 lg:px-8">
                {/* Left Content */}
                <div className="max-w-2xl">
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                        <Sparkles className="h-4 w-4" />
                        LEARN • PRACTICE • ACHIEVE
                    </div>

                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Making Physics
                        <span className="block text-blue-600">
                            Simple & Interesting
                        </span>
                        for Everyone.
                    </h1>

                    <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                        Master Physics with structured courses, interactive
                        practice questions, and expert guidance. Build strong
                        concepts and prepare confidently for your SSC and HSC
                        examinations.
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                        >
                            Explore Courses
                            <ArrowRight className="h-5 w-5" />
                        </Link>

                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                        >
                            <PlayCircle className="h-5 w-5 text-blue-600" />
                            Start Practicing
                        </Link>
                    </div>

                    {/* Highlights */}
                    <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4">
                        {[
                            'SSC Physics',
                            'HSC Physics',
                            'MCQ & CQ Practice',
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-2 text-sm font-medium text-slate-600"
                            >
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Content */}
                <div className="relative mx-auto w-full max-w-xl">
                    {/* Main Dashboard Card */}
                    <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-blue-900/10 sm:p-7">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Your Learning Journey
                                </p>
                                <h3 className="mt-1 text-xl font-bold text-slate-900">
                                    Explore Physics
                                </h3>
                            </div>

                            <div className="rounded-xl bg-blue-50 p-3">
                                <Atom className="h-7 w-7 text-blue-600" />
                            </div>
                        </div>

                        {/* Course Cards */}
                        <div className="mt-7 space-y-4">
                            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-xl bg-blue-600 p-3 text-white">
                                            <BookOpen className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-900">
                                                SSC Physics
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Complete course
                                            </p>
                                        </div>
                                    </div>

                                    <ArrowRight className="h-5 w-5 text-blue-600" />
                                </div>
                            </div>

                            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-xl bg-indigo-600 p-3 text-white">
                                            <GraduationCap className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-900">
                                                HSC Physics
                                            </h4>
                                            <p className="mt-1 text-xs text-slate-500">
                                                1st & 2nd Paper
                                            </p>
                                        </div>
                                    </div>

                                    <ArrowRight className="h-5 w-5 text-indigo-600" />
                                </div>
                            </div>
                        </div>

                        {/* Practice Categories */}
                        <div className="mt-7">
                            <p className="mb-4 text-sm font-bold text-slate-800">
                                Practice Your Way
                            </p>

                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { name: 'MCQ', icon: Target },
                                    { name: 'CQ', icon: BookOpen },
                                    { name: 'Short', icon: Sparkles },
                                ].map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.name}
                                            className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center"
                                        >
                                            <Icon className="mx-auto h-6 w-6 text-blue-600" />
                                            <p className="mt-2 text-sm font-semibold text-slate-700">
                                                {item.name}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Floating Achievement Card */}
                    <div className="absolute -bottom-7 -left-5 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex">
                        <div className="rounded-xl bg-amber-50 p-3">
                            <Trophy className="h-6 w-6 text-amber-500" />
                        </div>

                        <div>
                            <p className="text-sm font-bold text-slate-900">
                                Learn & Improve
                            </p>
                            <p className="text-xs text-slate-500">
                                Practice makes progress
                            </p>
                        </div>
                    </div>

                    {/* Floating Atom */}
                    <div className="absolute -right-5 -top-6 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-lg sm:block">
                        <Atom className="h-8 w-8 text-blue-600" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
