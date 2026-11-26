import Link from 'next/link';

import {
    ArrowRight,
    BookOpen,
    BrainCircuit,
    ChartNoAxesCombined,
    CheckCircle2,
    Clock,
    GraduationCap,
    Lightbulb,
    Target,
    Trophy,
} from 'lucide-react';

const features = [
    {
        id: 1,
        title: 'Expert Teacher Guidance',
        description:
            'Learn Physics with clear explanations, practical examples, and guidance from experienced educators.',
        icon: GraduationCap,
        iconStyle: 'bg-blue-50 text-blue-600',
    },
    {
        id: 2,
        title: 'Structured Learning',
        description:
            'Follow an organized learning path with chapter-wise lessons and carefully arranged study materials.',
        icon: BookOpen,
        iconStyle: 'bg-indigo-50 text-indigo-600',
    },
    {
        id: 3,
        title: 'Smart Question Bank',
        description:
            'Strengthen your understanding with MCQ, creative questions, and short-answer practice.',
        icon: BrainCircuit,
        iconStyle: 'bg-violet-50 text-violet-600',
    },
    {
        id: 4,
        title: 'Exam-Focused Preparation',
        description:
            'Prepare confidently with topic-based practice and questions designed around academic syllabuses.',
        icon: Target,
        iconStyle: 'bg-emerald-50 text-emerald-600',
    },
    {
        id: 5,
        title: 'Track Your Progress',
        description:
            'Review your learning activity, identify improvement areas, and stay focused on your goals.',
        icon: ChartNoAxesCombined,
        iconStyle: 'bg-amber-50 text-amber-600',
    },
    {
        id: 6,
        title: 'Learn at Your Own Pace',
        description:
            'Access your learning resources online and study whenever it fits your personal schedule.',
        icon: Clock,
        iconStyle: 'bg-rose-50 text-rose-600',
    },
];

const WhyChooseUs = () => {
    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-28">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-indigo-50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                        <Lightbulb className="h-4 w-4" />
                        THE SMARTER WAY TO LEARN
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Why Choose
                        <span className="text-blue-600"> Physics Academy?</span>
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                        Learning Physics should be simple, engaging, and
                        effective. We provide the learning tools and resources
                        you need to build concepts and prepare for success.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.id}
                                className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
                            >
                                <div
                                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconStyle} transition-transform duration-300 group-hover:scale-110`}
                                >
                                    <Icon className="h-7 w-7" />
                                </div>

                                <h3 className="text-lg font-bold text-slate-900">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-600">
                                    {feature.description}
                                </p>

                                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Designed for Better Learning
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 sm:px-10 lg:px-14">
                    <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
                        <div className="max-w-2xl">
                            <div className="mb-3 flex items-center justify-center gap-2 text-blue-300 md:justify-start">
                                <Trophy className="h-5 w-5" />
                                <span className="text-sm font-semibold">
                                    YOUR JOURNEY STARTS HERE
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-white sm:text-3xl">
                                Ready to Make Physics Your Strength?
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                                Explore our courses, practice regularly, and
                                take the next step toward your academic goals.
                            </p>
                        </div>

                        <Link
                            href="/courses"
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white transition hover:bg-blue-500"
                        >
                            Start Learning
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
