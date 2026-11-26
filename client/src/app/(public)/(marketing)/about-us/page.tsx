import Link from 'next/link';

import {
    ArrowRight,
    BookOpen,
    Brain,
    CheckCircle2,
    GraduationCap,
    Lightbulb,
    Target,
    Users,
    Trophy,
    Microscope,
    BookCheck,
    Rocket,
    Heart,
    Sparkles,
} from 'lucide-react';

const features = [
    {
        icon: BookOpen,
        title: 'Structured Learning',
        description:
            'Learn physics through organized courses, chapters, and carefully arranged learning materials.',
    },
    {
        icon: Brain,
        title: 'Practice-Based Learning',
        description:
            'Strengthen your understanding with MCQ, CQ, and short-question practice.',
    },
    {
        icon: Target,
        title: 'Exam Preparation',
        description:
            'Prepare confidently with practice exams, assessments, and performance tracking.',
    },
    {
        icon: Users,
        title: 'Student & Teacher Support',
        description:
            'A learning environment where students and teachers can connect and grow together.',
    },
];

const values = [
    {
        icon: Lightbulb,
        title: 'Understanding First',
        description:
            'We believe learning physics should begin with understanding concepts, not simply memorizing formulas.',
    },
    {
        icon: Heart,
        title: 'Student Focused',
        description:
            'Every learning experience should be accessible, meaningful, and designed around student needs.',
    },
    {
        icon: Rocket,
        title: 'Continuous Growth',
        description:
            'We encourage consistent practice, curiosity, and improvement at every stage of learning.',
    },
];

const courses = [
    {
        number: '01',
        title: 'Secondary Physics',
        description:
            'Build a strong foundation in physics with essential concepts and chapter-based practice.',
        level: 'SSC',
    },
    {
        number: '02',
        title: 'HSC Physics – 1st Paper',
        description:
            'Explore fundamental physics topics through structured lessons and exam-oriented questions.',
        level: 'HSC',
    },
    {
        number: '03',
        title: 'HSC Physics – 2nd Paper',
        description:
            'Develop deeper physics knowledge through conceptual learning and regular assessment.',
        level: 'HSC',
    },
];

export default function AboutUsPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-indigo-50">
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />

                <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:py-28">
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                            <Sparkles size={16} />
                            About Physics Academy
                        </span>

                        <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                            Making Physics
                            <span className="block text-blue-600">
                                Simple, Interesting & Accessible.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                            We are building a better learning experience for
                            students who want to understand physics, practice
                            with confidence, and achieve their academic goals.
                        </p>

                        <div className="mt-9 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/courses"
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                            >
                                Explore Courses
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/contact-us"
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
                            >
                                Contact Us
                            </Link>
                        </div>

                        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-500">
                            <span className="flex items-center gap-2">
                                <CheckCircle2
                                    size={17}
                                    className="text-blue-600"
                                />
                                Learn
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2
                                    size={17}
                                    className="text-blue-600"
                                />
                                Practice
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2
                                    size={17}
                                    className="text-blue-600"
                                />
                                Achieve
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Are */}
            <section className="container mx-auto px-4 py-20 sm:px-6 lg:py-24">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                            Who We Are
                        </span>

                        <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                            Education should inspire curiosity, not confusion.
                        </h2>

                        <p className="mt-6 leading-8 text-slate-600">
                            Physics Academy is an online learning platform
                            dedicated to making physics education more
                            organized, engaging, and accessible.
                        </p>

                        <p className="mt-4 leading-8 text-slate-600">
                            We bring together structured courses, chapter-wise
                            learning materials, question practice, and
                            assessments in one place. Our goal is to help
                            students move beyond memorization and develop a
                            genuine understanding of physics.
                        </p>

                        <p className="mt-4 leading-8 text-slate-600">
                            Whether you are preparing for SSC or HSC
                            examinations, Physics Academy provides a learning
                            environment where you can study at your own pace and
                            measure your progress.
                        </p>

                        <Link
                            href="/courses"
                            className="mt-7 inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:gap-3"
                        >
                            Discover our courses
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 rounded-3xl bg-blue-100/70 blur-2xl" />

                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl sm:p-12">
                            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-30 border-white/10" />

                            <div className="relative">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                                    <GraduationCap size={36} />
                                </div>

                                <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                                    Our Philosophy
                                </p>

                                <h3 className="mt-4 text-3xl font-bold leading-snug sm:text-4xl">
                                    Learn with purpose.
                                    <br />
                                    Practice with confidence.
                                    <br />
                                    Achieve with knowledge.
                                </h3>

                                <div className="mt-10 h-px bg-white/20" />

                                <p className="mt-6 text-sm leading-7 text-blue-100">
                                    LEARN <span className="mx-2">•</span>
                                    PRACTICE <span className="mx-2">•</span>
                                    ACHIEVE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-slate-50 py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                            Our Purpose
                        </span>

                        <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                            What Drives Us Forward
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            Our purpose is to create meaningful learning
                            opportunities and make physics easier to understand
                            for everyone.
                        </p>
                    </div>

                    <div className="mx-auto mt-12 grid max-w-5xl gap-7 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Target size={28} />
                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-slate-900">
                                Our Mission
                            </h3>

                            <p className="mt-4 leading-8 text-slate-600">
                                To make physics education accessible,
                                understandable, and effective through structured
                                learning resources, interactive practice, and
                                meaningful assessments.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <Lightbulb size={28} />
                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-slate-900">
                                Our Vision
                            </h3>

                            <p className="mt-4 leading-8 text-slate-600">
                                To become a trusted digital learning destination
                                where students develop scientific thinking,
                                build confidence, and reach their academic
                                potential.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="container mx-auto px-4 py-20 sm:px-6 lg:py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                        Why Physics Academy
                    </span>

                    <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                        A Smarter Way to Learn Physics
                    </h2>

                    <p className="mt-4 leading-7 text-slate-600">
                        Everything you need to understand concepts, improve your
                        skills, and prepare for examinations.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                                    <Icon size={27} />
                                </div>

                                <h3 className="mt-6 text-lg font-bold text-slate-900">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Learning Approach */}
            <section className="bg-slate-900 py-20 text-white lg:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-blue-400">
                            Our Learning Approach
                        </span>

                        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                            Three Steps Towards Better Learning
                        </h2>

                        <p className="mt-4 leading-7 text-slate-400">
                            A simple and organized approach that helps students
                            make consistent academic progress.
                        </p>
                    </div>

                    <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-3">
                        {[
                            {
                                number: '01',
                                icon: BookOpen,
                                title: 'Learn',
                                description:
                                    'Explore structured courses and understand physics concepts chapter by chapter.',
                            },
                            {
                                number: '02',
                                icon: BookCheck,
                                title: 'Practice',
                                description:
                                    'Test your understanding through MCQ, CQ, and short-question exercises.',
                            },
                            {
                                number: '03',
                                icon: Trophy,
                                title: 'Achieve',
                                description:
                                    'Take assessments, review your results, and identify opportunities to improve.',
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.number} className="text-center">
                                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/10 text-blue-400">
                                        <Icon size={34} />

                                        <span className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                            {item.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-7 text-xl font-bold">
                                        {item.title}
                                    </h3>

                                    <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Our Courses */}
            <section className="container mx-auto px-4 py-20 sm:px-6 lg:py-24">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                            What You Can Learn
                        </span>

                        <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Explore Our Courses
                        </h2>

                        <p className="mt-4 max-w-xl leading-7 text-slate-600">
                            Learning resources designed around the Secondary and
                            Higher Secondary Physics curriculum.
                        </p>
                    </div>

                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:gap-3"
                    >
                        View All Courses
                        <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {courses.map((course) => (
                        <div
                            key={course.number}
                            className="group rounded-2xl border border-slate-200 p-7 transition hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold text-blue-100">
                                    {course.number}
                                </span>

                                <span className="rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700">
                                    {course.level}
                                </span>
                            </div>

                            <div className="mt-7 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <Microscope size={25} />
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                {course.title}
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                {course.description}
                            </p>

                            <Link
                                href="/courses"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3"
                            >
                                Explore Course
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Values */}
            <section className="bg-blue-50/70 py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
                            Our Core Values
                        </span>

                        <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                            Principles Behind Everything We Do
                        </h2>
                    </div>

                    <div className="mx-auto mt-12 grid max-w-5xl gap-7 md:grid-cols-3">
                        {values.map((value) => {
                            const Icon = value.icon;

                            return (
                                <div
                                    key={value.title}
                                    className="rounded-2xl border border-blue-100 bg-white p-7 shadow-sm"
                                >
                                    <Icon size={30} className="text-blue-600" />

                                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                                        {value.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="container mx-auto px-4 py-20 sm:px-6 lg:py-24">
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-14 text-center text-white shadow-xl sm:px-12 sm:py-16">
                    <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-35 border-white/10" />
                    <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-35 border-white/10" />

                    <div className="relative mx-auto max-w-2xl">
                        <GraduationCap
                            size={45}
                            className="mx-auto text-blue-100"
                        />

                        <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
                            Your Learning Journey Starts Here
                        </h2>

                        <p className="mt-5 leading-8 text-blue-100">
                            Take the next step towards understanding physics
                            better. Explore our courses, practice regularly, and
                            work towards your academic goals.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/courses"
                                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                            >
                                Start Learning
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/contact-us"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
