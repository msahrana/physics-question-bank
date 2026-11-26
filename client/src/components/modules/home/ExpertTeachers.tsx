import Link from 'next/link';

import {
    ArrowRight,
    Award,
    BookOpen,
    GraduationCap,
    MoveUpRight,
    Quote,
} from 'lucide-react';

const teachers = [
    {
        id: 1,
        name: 'Teacher Name',
        designation: 'Senior Physics Instructor',
        qualification: 'M.Sc. in Physics',
        specialization: 'SSC Physics',
        initials: 'TN',
        description:
            'Focused on building strong Physics fundamentals through clear explanations and practical examples.',
        color: 'from-blue-500 to-indigo-600',
        profileHref: '/teachers/teacher-name',
    },
    {
        id: 2,
        name: 'Teacher Name',
        designation: 'HSC Physics Instructor',
        qualification: 'M.Sc. in Physics',
        specialization: 'HSC Physics 1st Paper',
        initials: 'TN',
        description:
            'Dedicated to making complex Physics concepts easier through structured and analytical learning.',
        color: 'from-violet-500 to-purple-600',
        profileHref: '/teachers/teacher-name',
    },
    {
        id: 3,
        name: 'Teacher Name',
        designation: 'Physics Subject Specialist',
        qualification: 'M.Sc. in Physics',
        specialization: 'HSC Physics 2nd Paper',
        initials: 'TN',
        description:
            'Helps students understand electricity, magnetism, and modern Physics with conceptual clarity.',
        color: 'from-emerald-500 to-teal-600',
        profileHref: '/teachers/teacher-name',
    },
];

const ExpertTeachers = () => {
    return (
        <section className="relative overflow-hidden bg-slate-50 py-20 md:py-28">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700">
                        <GraduationCap className="h-4 w-4" />
                        LEARN FROM THE BEST
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Meet Our
                        <span className="text-blue-600"> Expert Teachers</span>
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                        Learn from dedicated Physics educators who make complex
                        concepts easier to understand and help students develop
                        strong academic foundations.
                    </p>
                </div>

                {/* Teacher Cards */}
                <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {teachers.map((teacher) => (
                        <div
                            key={teacher.id}
                            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
                        >
                            {/* Teacher Profile Area */}
                            <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-100">
                                <div
                                    className={`flex h-36 w-36 items-center justify-center rounded-full bg-linear-to-br ${teacher.color} text-4xl font-extrabold text-white shadow-xl ring-8 ring-white/70 transition-transform duration-500 group-hover:scale-105`}
                                >
                                    {teacher.initials}
                                </div>

                                {/* Specialization Badge */}
                                <div className="absolute bottom-4 left-4 rounded-full border border-white/70 bg-white/95 px-4 py-2 text-xs font-bold text-blue-700 shadow-sm">
                                    {teacher.specialization}
                                </div>

                                <div className="absolute right-4 top-4 rounded-xl bg-white p-2.5 shadow-sm">
                                    <Award className="h-5 w-5 text-amber-500" />
                                </div>
                            </div>

                            {/* Teacher Information */}
                            <div className="p-6">
                                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                                    {teacher.designation}
                                </p>

                                <h3 className="mt-2 text-xl font-bold text-slate-900">
                                    {teacher.name}
                                </h3>

                                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                                    <GraduationCap className="h-4 w-4 shrink-0 text-blue-600" />
                                    {teacher.qualification}
                                </div>

                                <div className="mt-3 flex items-start gap-2 text-sm leading-7 text-slate-600">
                                    <BookOpen className="mt-1 h-4 w-4 shrink-0 text-blue-600" />
                                    <span>{teacher.description}</span>
                                </div>

                                {/* Profile Link */}
                                <div className="mt-6 border-t border-slate-100 pt-5">
                                    <Link
                                        href={teacher.profileHref}
                                        className="inline-flex w-full items-center justify-between rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        View Teacher Profile
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl border border-blue-100 bg-white p-7 shadow-sm sm:flex-row sm:px-10">
                    <div className="flex items-start gap-4">
                        <div className="rounded-xl bg-blue-50 p-3">
                            <Quote className="h-6 w-6 text-blue-600" />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900">
                                Great Teachers Make Learning Meaningful
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                Discover the educators behind your Physics
                                learning journey.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/teachers"
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        View All Teachers
                        <MoveUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ExpertTeachers;
