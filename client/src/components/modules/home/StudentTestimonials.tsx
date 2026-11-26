import { ArrowRight, MessageSquareQuote, Quote } from 'lucide-react';
import Link from 'next/link';

const testimonials = [
    {
        id: 1,
        name: 'Student Name',
        level: 'HSC 2026',
        course: 'HSC Physics 1st Paper',
        initials: 'SN',
        message:
            'এই জায়গায় একজন শিক্ষার্থীর বাস্তব অভিজ্ঞতা এবং কোর্স সম্পর্কে মতামত যুক্ত করুন।',
    },
    {
        id: 2,
        name: 'Student Name',
        level: 'HSC 2026',
        course: 'HSC Physics 2nd Paper',
        initials: 'SN',
        message:
            'শিক্ষার্থীরা কীভাবে ক্লাস, অনুশীলন এবং প্রশ্নব্যাংক থেকে উপকৃত হয়েছে, তা এখানে তুলে ধরুন।',
    },
    {
        id: 3,
        name: 'Student Name',
        level: 'SSC 2026',
        course: 'SSC Physics',
        initials: 'SN',
        message:
            'একজন শিক্ষার্থীর প্রকৃত feedback দিয়ে এই অংশটি পূরণ করুন, যাতে নতুন শিক্ষার্থীরা উপকৃত হয়।',
    },
];

export default function StudentTestimonials() {
    return (
        <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
            <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
            <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                        <MessageSquareQuote size={16} />
                        Student Feedback
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        What Our Students
                        <span className="block text-blue-600">
                            Say About Us
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                        Every student has a unique learning journey. Discover
                        their experiences and see how structured physics
                        learning can make a difference.
                    </p>
                </div>

                {/* Testimonial Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <article
                            key={testimonial.id}
                            className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-base font-bold text-blue-700">
                                    {testimonial.initials}
                                </div>

                                <Quote
                                    size={32}
                                    className="text-blue-100 transition-colors group-hover:text-blue-200"
                                />
                            </div>

                            <p className="mt-7 flex-1 text-base leading-8 text-slate-600">
                                &ldquo;{testimonial.message}&rdquo;
                            </p>

                            <div className="my-6 border-t border-slate-100" />

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    {testimonial.name}
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    {testimonial.level}
                                </p>

                                <span className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                                    {testimonial.course}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
                    <p className="text-sm text-slate-600">
                        Ready to start your own learning journey?
                    </p>

                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
                    >
                        Join Our Academy
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
