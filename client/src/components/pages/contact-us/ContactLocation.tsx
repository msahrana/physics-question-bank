import { ExternalLink, MapPin, Navigation } from 'lucide-react';

const mapQuery = 'Rangpur, Bangladesh';

const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

const mapDirectionUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

export default function ContactLocation() {
    return (
        <section id="our-location" className="scroll-mt-24">
            <div className="mb-10 text-center">
                <p className="mb-2 font-semibold uppercase tracking-wider text-sky-600">
                    Find Us
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                    Visit Our Location
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
                    We would love to connect with you. Find our location and get
                    directions using Google Maps.
                </p>
            </div>

            <div className="grid gap-8 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-3">
                <div className="p-7 sm:p-9">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                        <MapPin size={25} />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        GridCare Office
                    </h3>

                    <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                        Rangpur, Bangladesh
                    </p>

                    <div className="mt-7 space-y-3 border-t border-slate-100 pt-6 dark:border-slate-800">
                        <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <Navigation size={17} className="text-sky-600" />
                            Easy Google Maps directions
                        </div>
                    </div>

                    <a
                        href={mapDirectionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                    >
                        Get Directions
                        <ExternalLink size={16} />
                    </a>
                </div>

                <div className="min-h-87.5 lg:col-span-2 lg:min-h-105">
                    <iframe
                        src={mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: '350px' }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                        title="GridCare Office Location - Rangpur, Bangladesh"
                        className="h-full w-full"
                    />
                </div>
            </div>
        </section>
    );
}
