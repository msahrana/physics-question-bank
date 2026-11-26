'use client';

import { useState } from 'react';

import { useForm } from '@tanstack/react-form';

import { z } from 'zod';

import { Send, Loader2, CheckCircle2, MessageSquare } from 'lucide-react';

// Validation Schema
const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters'),

    email: z
        .string()
        .trim()
        .email('Please enter a valid email address')
        .max(255, 'Email cannot exceed 255 characters'),

    phone: z.string().max(30, 'Phone number is too long').optional(),

    subject: z.string().min(1, 'Please select a subject'),

    message: z
        .string()
        .trim()
        .min(10, 'Message must be at least 10 characters')
        .max(2000, 'Message cannot exceed 2000 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Input Styles
const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-950';

// Error Message Helper
function getErrorMessage(error: unknown): string {
    if (typeof error === 'string') {
        return error;
    }

    if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
    ) {
        return error.message;
    }

    return 'Invalid value';
}

// Component
export default function ContactForm() {
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        } as ContactFormValues,

        validators: {
            onSubmit: contactSchema,
        },

        onSubmit: async ({ value }) => {
            setSuccess(false);
            setServerError('');

            try {
                const response = await fetch('/api/contact-us', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify(value),
                });

                // Read response as text first
                // This prevents Unexpected token '<' errors
                const responseText = await response.text();

                let result: {
                    success?: boolean;
                    message?: string;
                    data?: unknown;
                };

                try {
                    result = JSON.parse(responseText);
                } catch {
                    console.error(
                        'Invalid API response:',
                        responseText.slice(0, 500),
                    );

                    throw new Error(
                        response.status === 404
                            ? 'Contact API endpoint not found. Please check your API route.'
                            : 'Server returned an invalid response. Please check your API configuration.',
                    );
                }

                if (!response.ok || result.success === false) {
                    throw new Error(
                        result.message ||
                            'Unable to send your message. Please try again.',
                    );
                }

                // Success
                setSuccess(true);
                form.reset();
            } catch (error) {
                console.error('Contact form submission error:', error);

                setServerError(
                    error instanceof Error
                        ? error.message
                        : 'Unable to send your message. Please try again.',
                );
            }
        },
    });

    return (
        <section id="contact-form" className="scroll-mt-24">
            <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-5">
                {/* Information Panel */}
                <div className="relative overflow-hidden bg-sky-600 p-8 text-white sm:p-10 lg:col-span-2">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-35 border-white/10" />

                    <div className="relative">
                        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                            <MessageSquare size={25} />
                        </div>

                        <h2 className="text-3xl font-bold">
                            Send Us a Message
                        </h2>

                        <p className="mt-5 leading-7 text-sky-100">
                            Have a question, suggestion, or need assistance?
                            Fill out the form and our support team will get back
                            to you.
                        </p>

                        <div className="mt-12 space-y-6">
                            <div>
                                <p className="font-semibold">Quick Response</p>

                                <p className="mt-1 text-sm text-sky-100">
                                    We aim to respond within 1–2 business days.
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Personal Assistance
                                </p>

                                <p className="mt-1 text-sm text-sky-100">
                                    Our team is ready to help.
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Your Privacy Matters
                                </p>

                                <p className="mt-1 text-sm text-sky-100">
                                    Your contact information will be handled
                                    responsibly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="p-6 sm:p-10 lg:col-span-3">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Get in Touch
                    </h3>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Please complete all required fields.
                    </p>

                    {/* Success Message */}
                    {success && (
                        <output className="mt-6 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400">
                            <CheckCircle2 size={20} className="shrink-0" />
                            Your message has been submitted successfully.
                        </output>
                    )}

                    {/* Server Error */}
                    {serverError && (
                        <div
                            role="alert"
                            className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
                        >
                            {serverError}
                        </div>
                    )}

                    <form
                        className="mt-8 space-y-5"
                        noValidate
                        onSubmit={(event) => {
                            event.preventDefault();
                            event.stopPropagation();

                            form.handleSubmit();
                        }}
                    >
                        {/* Name & Email */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <form.Field name="name">
                                {(field) => (
                                    <div>
                                        <label
                                            htmlFor={field.name}
                                            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                                        >
                                            Full Name{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Enter your name"
                                            className={inputClass}
                                            autoComplete="name"
                                            aria-invalid={
                                                field.state.meta.errors.length >
                                                0
                                            }
                                        />

                                        {field.state.meta.errors.length > 0 && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {field.state.meta.errors
                                                    .map(getErrorMessage)
                                                    .join(', ')}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </form.Field>

                            <form.Field name="email">
                                {(field) => (
                                    <div>
                                        <label
                                            htmlFor={field.name}
                                            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                                        >
                                            Email Address{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            id={field.name}
                                            name={field.name}
                                            type="email"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="example@email.com"
                                            className={inputClass}
                                            autoComplete="email"
                                            aria-invalid={
                                                field.state.meta.errors.length >
                                                0
                                            }
                                        />

                                        {field.state.meta.errors.length > 0 && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {field.state.meta.errors
                                                    .map(getErrorMessage)
                                                    .join(', ')}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        {/* Phone */}
                        <form.Field name="phone">
                            {(field) => (
                                <div>
                                    <label
                                        htmlFor={field.name}
                                        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type="tel"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="+880 1XXX-XXXXXX"
                                        className={inputClass}
                                        autoComplete="tel"
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Subject */}
                        <form.Field name="subject">
                            {(field) => (
                                <div>
                                    <label
                                        htmlFor={field.name}
                                        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                                    >
                                        Subject{' '}
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                        className={inputClass}
                                        aria-invalid={
                                            field.state.meta.errors.length > 0
                                        }
                                    >
                                        <option value="" disabled>
                                            Select a subject
                                        </option>

                                        <option value="general">
                                            General Inquiry
                                        </option>

                                        <option value="technical">
                                            Technical Support
                                        </option>

                                        <option value="appointment">
                                            Appointment Assistance
                                        </option>

                                        <option value="doctor">
                                            Doctor Registration
                                        </option>

                                        <option value="feedback">
                                            Feedback & Suggestions
                                        </option>

                                        <option value="other">Other</option>
                                    </select>

                                    {field.state.meta.errors.length > 0 && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {field.state.meta.errors
                                                .map(getErrorMessage)
                                                .join(', ')}
                                        </p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {/* Message */}
                        <form.Field name="message">
                            {(field) => (
                                <div>
                                    <label
                                        htmlFor={field.name}
                                        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                                    >
                                        Your Message{' '}
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        rows={5}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="How can we help you?"
                                        className={`${inputClass} resize-none`}
                                        aria-invalid={
                                            field.state.meta.errors.length > 0
                                        }
                                    />

                                    {field.state.meta.errors.length > 0 && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {field.state.meta.errors
                                                .map(getErrorMessage)
                                                .join(', ')}
                                        </p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        {/* Submit Button */}
                        <form.Subscribe
                            selector={(state) => state.isSubmitting}
                        >
                            {(isSubmitting) => (
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-6 py-3.5 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2
                                                className="animate-spin"
                                                size={18}
                                            />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            )}
                        </form.Subscribe>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            By submitting this form, you agree to let GridCare
                            contact you regarding your inquiry.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
