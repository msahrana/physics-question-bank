'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const faqs = [
    {
        question: 'How can I enroll in a course?',
        answer: 'Create an account on our platform, browse the available courses, select your preferred Physics course, and follow the enrollment instructions.',
    },
    {
        question: 'Are the courses suitable for SSC and HSC students?',
        answer: 'Yes. Our course structure is designed for SSC and HSC Physics students. You can choose a course according to your academic level and syllabus.',
    },
    {
        question: 'Can I practice MCQ and CQ questions?',
        answer: 'Yes. The platform provides question practice opportunities, including MCQ and creative question practice, depending on the features available in your enrolled course.',
    },
    {
        question: 'Can I track my learning progress?',
        answer: 'Yes. Your student dashboard can help you monitor course progress, practice activities, and learning performance as you use the platform.',
    },
    {
        question: 'Can I access my courses anytime?',
        answer: 'Course access depends on the enrollment conditions and platform availability. Please check the details of your selected course before enrolling.',
    },
    {
        question: 'How can I get support if I face a problem?',
        answer: 'You can contact our support team through the Contact Us page. Include your account information and a description of the issue so the team can assist you.',
    },
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setActiveIndex((current) => (current === index ? null : index));
    };

    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-28">
            <div className="absolute -right-32 top-10 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />
            <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-indigo-50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                        <HelpCircle size={16} />
                        Frequently Asked Questions
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Got Questions?
                        <span className="block text-blue-600">
                            We Have Answers.
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                        Find answers to common questions about our courses,
                        learning platform, and student experience.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="mx-auto max-w-3xl space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <div
                                key={faq.question}
                                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                                    isOpen
                                        ? 'border-blue-200 bg-blue-50/50 shadow-md shadow-blue-100/40'
                                        : 'border-slate-200 bg-white hover:border-blue-200'
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${index}`}
                                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7"
                                >
                                    <span
                                        className={`text-sm font-semibold leading-7 sm:text-base ${
                                            isOpen
                                                ? 'text-blue-700'
                                                : 'text-slate-800'
                                        }`}
                                    >
                                        {faq.question}
                                    </span>

                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                            isOpen
                                                ? 'rotate-180 bg-blue-600 text-white'
                                                : 'bg-slate-100 text-slate-600'
                                        }`}
                                    >
                                        <ChevronDown size={18} />
                                    </span>
                                </button>

                                <div
                                    id={`faq-answer-${index}`}
                                    hidden={!isOpen}
                                >
                                    <div className="px-5 pb-6 sm:px-7">
                                        <div className="border-t border-blue-100 pt-4">
                                            <p className="text-sm leading-8 text-slate-600 sm:text-base">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Contact CTA */}
                <div className="mt-14 text-center">
                    <p className="text-sm text-slate-600 sm:text-base">
                        Still have questions? We are here to help.
                    </p>

                    <Link
                        href="/contact-us"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                        Contact Our Team
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
