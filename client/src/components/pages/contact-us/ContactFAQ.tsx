'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'How can I book an appointment through GridCare?',
        answer: 'You can browse available doctors, view their profiles and schedules, and book an appointment through your GridCare account.',
    },
    {
        question: 'How can I register as a doctor?',
        answer: 'You can apply through the doctor registration or application section. Our administration team will review your submitted information.',
    },
    {
        question: 'How can I get technical support?',
        answer: 'You can contact our support team through this page or email us with details about the technical issue you are experiencing.',
    },
    {
        question: 'Can I reschedule or cancel an appointment?',
        answer: 'Appointment changes depend on the appointment status and applicable policies. Please check your appointment dashboard or contact our support team.',
    },
    {
        question: 'How long does it take to receive a response?',
        answer: 'We aim to respond to general inquiries within one to two business days. Response times may vary depending on the nature of your request.',
    },
];

export default function ContactFAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section>
            <div className="mb-10 text-center">
                <p className="mb-2 font-semibold uppercase tracking-wider text-sky-600">
                    FAQs
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                    Frequently Asked Questions
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
                    Find answers to some of the most common questions about
                    GridCare.
                </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-3">
                {faqs.map((faq, index) => {
                    const isOpen = activeIndex === index;

                    return (
                        <div
                            key={faq.question}
                            className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setActiveIndex(isOpen ? null : index)
                                }
                                aria-expanded={isOpen}
                                className="flex w-full items-center justify-between gap-4 p-5 text-left"
                            >
                                <span className="font-semibold text-slate-800 dark:text-slate-100">
                                    {faq.question}
                                </span>

                                <ChevronDown
                                    size={20}
                                    className={`shrink-0 text-sky-600 transition-transform duration-300 ${
                                        isOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {isOpen && (
                                <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600 dark:border-slate-800 dark:text-slate-400">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
