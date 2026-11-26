import Link from 'next/link';

import {
    ArrowRight,
    Atom,
    BookOpen,
    Calculator,
    CheckCircle2,
    GraduationCap,
    MoveUpRight,
} from 'lucide-react';

const courses = [
    {
        id: 1,
        title: 'SSC Physics',
        subtitle: 'Secondary School Certificate',
        description:
            'Build a strong foundation in Physics with chapter-wise lessons, explanations, and examination-focused practice.',
        icon: Atom,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        badge: 'CLASS 9–10',
        badgeStyle: 'bg-blue-50 text-blue-700',
        topics: [
            'Physical Quantities & Measurement',
            'Motion and Force',
            'Work, Energy & Power',
        ],
        href: '/courses/ssc-physics',
        cardStyle: 'border-blue-100 hover:border-blue-300',
        buttonStyle: 'bg-blue-600 hover:bg-blue-700',
    },
    {
        id: 2,
        title: 'HSC Physics 1st Paper',
        subtitle: 'Higher Secondary Certificate',
        description:
            'Understand mechanics, vectors, dynamics, and other essential concepts through structured learning.',
        icon: GraduationCap,
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-600',
        badge: 'CLASS 11–12',
        badgeStyle: 'bg-indigo-50 text-indigo-700',
        topics: [
            'Vector and Dynamics',
            'Newtonian Mechanics',
            'Work, Energy & Gravitation',
        ],
        href: '/courses/hsc-physics-1st-paper',
        cardStyle: 'border-indigo-100 hover:border-indigo-300',
        buttonStyle: 'bg-indigo-600 hover:bg-indigo-700',
    },
    {
        id: 3,
        title: 'HSC Physics 2nd Paper',
        subtitle: 'Higher Secondary Certificate',
        description:
            'Explore electricity, magnetism, modern physics, and practical applications with clear explanations.',
        icon: Calculator,
        iconBg: 'bg-violet-100',
        iconColor: 'text-violet-600',
        badge: 'CLASS 11–12',
        badgeStyle: 'bg-violet-50 text-violet-700',
        topics: ['Thermodynamics', 'Electricity & Magnetism', 'Modern Physics'],
        href: '/courses/hsc-physics-2nd-paper',
        cardStyle: 'border-violet-100 hover:border-violet-300',
        buttonStyle: 'bg-violet-600 hover:bg-violet-700',
    },
];

const CourseCategories = () => {
    return (
        <section className="relative bg-slate-50 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                        <BookOpen className="h-4 w-4" />
                        OUR LEARNING PROGRAMS
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Explore Our
                        <span className="text-blue-600"> Physics Courses</span>
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                        Choose the right learning path for your academic
                        journey. Learn Physics step by step with structured
                        lessons and focused practice.
                    </p>
                </div>

                {/* Course Cards */}
                <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => {
                        const Icon = course.icon;

                        return (
                            <div
                                key={course.id}
                                className={`group flex flex-col rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${course.cardStyle}`}
                            >
                                {/* Card Header */}
                                <div className="flex items-start justify-between">
                                    <div
                                        className={`rounded-2xl p-4 ${course.iconBg}`}
                                    >
                                        <Icon
                                            className={`h-8 w-8 ${course.iconColor}`}
                                        />
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${course.badgeStyle}`}
                                    >
                                        {course.badge}
                                    </span>
                                </div>

                                {/* Card Content */}
                                <div className="mt-7">
                                    <p className="text-sm font-medium text-slate-500">
                                        {course.subtitle}
                                    </p>

                                    <h3 className="mt-2 text-xl font-bold leading-snug text-slate-900">
                                        {course.title}
                                    </h3>

                                    <p className="mt-4 min-h-24 text-sm leading-7 text-slate-600">
                                        {course.description}
                                    </p>
                                </div>

                                {/* Topics */}
                                <div className="mt-5 border-t border-slate-100 pt-5">
                                    <h4 className="mb-4 text-sm font-bold text-slate-800">
                                        What you will learn
                                    </h4>

                                    <ul className="space-y-3">
                                        {course.topics.map((topic) => (
                                            <li
                                                key={topic}
                                                className="flex items-start gap-3 text-sm text-slate-600"
                                            >
                                                <CheckCircle2
                                                    className={`mt-0.5 h-4 w-4 shrink-0 ${course.iconColor}`}
                                                />
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Button */}
                                <div className="mt-auto pt-8">
                                    <Link
                                        href={course.href}
                                        className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition ${course.buttonStyle}`}
                                    >
                                        Explore Course
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                        View All Courses
                        <MoveUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CourseCategories;
