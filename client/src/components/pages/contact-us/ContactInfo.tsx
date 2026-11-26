import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';

const contactDetails = [
    {
        icon: Mail,
        title: 'Email Address',
        value: 'support@gridcare.com',
        description: 'Send us an email anytime.',
        href: 'mailto:support@gridcare.com',
    },
    {
        icon: Phone,
        title: 'Phone Number',
        value: '+880 1XXX-XXXXXX',
        description: 'Talk directly with our team.',
        href: 'tel:+8801XXXXXXXXX',
    },
    {
        icon: MapPin,
        title: 'Our Location',
        value: 'Rangpur, Bangladesh',
        description: 'Visit our office location.',
        href: '#our-location',
    },
    {
        icon: Clock,
        title: 'Working Hours',
        value: '9:00 AM – 6:00 PM',
        description: 'Saturday – Thursday',
        href: null,
    },
];

export default function ContactInfo() {
    return (
        <section>
            <div className="mb-10 text-center">
                <p className="mb-2 font-semibold uppercase tracking-wider text-sky-600">
                    Contact Information
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                    We'd Love to Hear From You
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
                    Choose your preferred way to connect with our team. We are
                    always happy to help.
                </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {contactDetails.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-800 dark:hover:shadow-none"
                        >
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-950 dark:text-sky-400">
                                <Icon size={23} />
                            </div>

                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                {item.title}
                            </h3>

                            {item.href ? (
                                <a
                                    href={item.href}
                                    className="mt-2 inline-flex items-center gap-1 wrap-break-word font-medium text-sky-600 hover:text-sky-700"
                                >
                                    {item.value}
                                    <ArrowUpRight size={15} />
                                </a>
                            ) : (
                                <p className="mt-2 font-medium text-slate-800 dark:text-slate-200">
                                    {item.value}
                                </p>
                            )}

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
