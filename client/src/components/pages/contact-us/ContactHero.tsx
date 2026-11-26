import { ArrowRight, Headset } from 'lucide-react';
import Link from 'next/link';

export default function ContactHero() {
    return (
        <section className="relative overflow-hidden bg-linear-to-br from-sky-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-500/10" />

            <div className="container relative mx-auto px-4 py-20 md:px-6 md:py-28">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-700 shadow-sm dark:border-sky-900 dark:bg-slate-900 dark:text-sky-400">
                        <Headset size={17} />
                        We are here to help
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                        Let's Start a{' '}
                        <span className="text-sky-600">Conversation</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 md:text-lg">
                        Have questions about GridCare? Need help with
                        appointments or healthcare services? Our team is always
                        ready to assist you.
                    </p>

                    <div className="mt-9 flex flex-wrap justify-center gap-4">
                        <Link
                            href="#contact-form"
                            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
                        >
                            Send Us a Message
                            <ArrowRight size={18} />
                        </Link>

                        <Link
                            href="#our-location"
                            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-sky-500 hover:text-sky-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                        >
                            Find Our Location
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
