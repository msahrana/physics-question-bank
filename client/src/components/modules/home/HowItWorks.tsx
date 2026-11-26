import Link from 'next/link';

import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    GraduationCap,
    LineChart,
    UserPlus,
} from 'lucide-react';

const steps = [
    {
        id: '01',
        title: 'Create Your Account',
        description:
            'Sign up for free and create your student profile to access your personalized learning experience.',
        icon: UserPlus,
        iconStyle: 'bg-blue-100 text-blue-600',
    },
    {
        id: '02',
        title: 'Choose Your Course',
        description:
            'Explore our SSC and HSC Physics programs and select the course that matches your academic goals.',
        icon: GraduationCap,
        iconStyle: 'bg-indigo-100 text-indigo-600',
    },
    {
        id: '03',
        title: 'Learn & Practice',
        description:
            'Study organized lessons, understand important concepts, and improve through MCQ and CQ practice.',
        icon: BookOpen,
        iconStyle: 'bg-violet-100 text-violet-600',
    },
    {
        id: '04',
        title: 'Track Your Progress',
        description:
            'Review your practice results, identify learning gaps, and work toward continuous improvement.',
        icon: LineChart,
        iconStyle: 'bg-emerald-100 text-emerald-600',
    },
];

const HowItWorks = () => {
    return (
        <section className="relative overflow-hidden bg-slate-50 py-20 md:py-28">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700">
                        <CheckCircle2 className="h-4 w-4" />
                        SIMPLE LEARNING PROCESS
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        How Does It
                        <span className="text-blue-600"> Work?</span>
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                        Getting started with Physics Academy is simple. Follow
                        these four steps and begin your journey toward better
                        understanding and academic improvement.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Connecting Line */}
                    <div className="absolute left-[12%] right-[12%] top-10 hidden border-t-2 border-dashed border-blue-200 lg:block" />

                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.id}
                                className="group relative flex flex-col items-center text-center"
                            >
                                {/* Icon */}
                                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-slate-50 bg-white shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-xl ${step.iconStyle}`}
                                    >
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    {/* Step Number */}
                                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white ring-4 ring-slate-50">
                                        {step.id}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="mt-7 max-w-xs">
                                    <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                                        STEP {step.id}
                                    </span>

                                    <h3 className="mt-2 text-lg font-bold text-slate-900">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-700"
                    >
                        Get Started Today
                        <ArrowRight className="h-5 w-5" />
                    </Link>

                    <p className="mt-4 text-sm text-slate-500">
                        Start your learning journey with Physics Academy.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
