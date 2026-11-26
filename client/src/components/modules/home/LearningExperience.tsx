import {
    ArrowRight,
    BarChart3,
    BookOpen,
    BrainCircuit,
    CheckCircle2,
    GraduationCap,
    Layers3,
    PlayCircle,
    Target,
    Trophy,
} from 'lucide-react';

import Link from 'next/link';

const features = [
    {
        id: 1,
        title: 'Personalized Student Dashboard',
        description:
            'Access your courses, learning activities, practice history, and important updates from one organized dashboard.',
        icon: GraduationCap,
        iconStyle: 'bg-blue-100 text-blue-600',
    },
    {
        id: 2,
        title: 'Interactive MCQ Examination',
        description:
            'Test your knowledge with objective questions and review your results to understand your strengths and weaknesses.',
        icon: Target,
        iconStyle: 'bg-indigo-100 text-indigo-600',
    },
    {
        id: 3,
        title: 'Creative Question Practice',
        description:
            'Develop analytical and problem-solving skills through structured creative questions and written practice.',
        icon: BrainCircuit,
        iconStyle: 'bg-violet-100 text-violet-600',
    },
    {
        id: 4,
        title: 'Chapter-wise Learning',
        description:
            'Study Physics systematically with organized chapters, topics, lessons, and supporting learning materials.',
        icon: Layers3,
        iconStyle: 'bg-emerald-100 text-emerald-600',
    },
    {
        id: 5,
        title: 'Performance Analytics',
        description:
            'Understand your learning progress through practice results, performance summaries, and improvement insights.',
        icon: BarChart3,
        iconStyle: 'bg-amber-100 text-amber-600',
    },
];

const LearningExperience = () => {
    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-28">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                        <BookOpen className="h-4 w-4" />A COMPLETE LEARNING
                        EXPERIENCE
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Everything You Need to
                        <span className="text-blue-600"> Learn Better</span>
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                        Explore a smarter way to study Physics with organized
                        learning resources, interactive assessments, and tools
                        designed to support your academic journey.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
                    {/* Left: Platform Preview */}
                    <div className="relative">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-xl shadow-blue-900/5 sm:p-6">
                            {/* Dashboard Header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-slate-500">
                                        STUDENT OVERVIEW
                                    </p>
                                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                                        Learning Dashboard
                                    </h3>
                                </div>

                                <div className="rounded-xl bg-blue-100 p-3">
                                    <GraduationCap className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>

                            {/* Overview Cards */}
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <BookOpen className="h-5 w-5" />
                                        <span className="text-xs font-medium text-slate-500">
                                            My Courses
                                        </span>
                                    </div>
                                    <p className="mt-3 text-2xl font-extrabold text-slate-900">
                                        03
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Learning programs
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                                    <div className="flex items-center gap-2 text-emerald-600">
                                        <Target className="h-5 w-5" />
                                        <span className="text-xs font-medium text-slate-500">
                                            Practice
                                        </span>
                                    </div>
                                    <p className="mt-3 text-2xl font-extrabold text-slate-900">
                                        MCQ
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Question practice
                                    </p>
                                </div>
                            </div>

                            {/* Learning Progress */}
                            <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-slate-900">
                                            Learning Activity
                                        </h4>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Example course progress
                                        </p>
                                    </div>

                                    <BarChart3 className="h-5 w-5 text-blue-600" />
                                </div>

                                <div className="mt-6 space-y-5">
                                    {[
                                        {
                                            name: 'SSC Physics',
                                            progress: 70,
                                            color: 'bg-blue-600',
                                        },
                                        {
                                            name: 'HSC Physics 1st Paper',
                                            progress: 45,
                                            color: 'bg-indigo-600',
                                        },
                                        {
                                            name: 'HSC Physics 2nd Paper',
                                            progress: 30,
                                            color: 'bg-violet-600',
                                        },
                                    ].map((item) => (
                                        <div key={item.name}>
                                            <div className="mb-2 flex justify-between text-xs">
                                                <span className="font-semibold text-slate-700">
                                                    {item.name}
                                                </span>
                                                <span className="font-bold text-slate-600">
                                                    {item.progress}%
                                                </span>
                                            </div>

                                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className={`h-full rounded-full ${item.color}`}
                                                    style={{
                                                        width: `${item.progress}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-5">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-slate-900">
                                        Learning Tools
                                    </h4>

                                    <span className="text-xs font-medium text-blue-600">
                                        Explore
                                    </span>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    {[
                                        {
                                            name: 'MCQ Test',
                                            icon: Target,
                                        },
                                        {
                                            name: 'CQ Practice',
                                            icon: BrainCircuit,
                                        },
                                        {
                                            name: 'Lessons',
                                            icon: PlayCircle,
                                        },
                                    ].map((tool) => {
                                        const Icon = tool.icon;

                                        return (
                                            <div
                                                key={tool.name}
                                                className="rounded-xl bg-slate-50 p-3 text-center"
                                            >
                                                <Icon className="mx-auto h-5 w-5 text-blue-600" />
                                                <p className="mt-2 text-[11px] font-semibold text-slate-600">
                                                    {tool.name}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Floating Card */}
                        <div className="absolute -bottom-6 -right-3 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex">
                            <div className="rounded-xl bg-amber-50 p-3">
                                <Trophy className="h-6 w-6 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    Keep Improving
                                </p>
                                <p className="text-xs text-slate-500">
                                    Every practice counts
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Features List */}
                    <div className="space-y-7">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.id}
                                    className="group flex gap-5"
                                >
                                    <div
                                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${feature.iconStyle} transition-transform duration-300 group-hover:scale-110`}
                                    >
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    <div className="flex-1 border-b border-slate-100 pb-6">
                                        <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-7 text-slate-600">
                                            {feature.description}
                                        </p>

                                        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Designed for effective learning
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <Link
                            href="/signup"
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Join Physics Academy
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LearningExperience;
