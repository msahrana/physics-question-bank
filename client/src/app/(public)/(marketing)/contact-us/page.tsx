import ContactFAQ from '@/components/pages/contact-us/ContactFAQ';
import ContactForm from '@/components/pages/contact-us/ContactForm';
import ContactHero from '@/components/pages/contact-us/ContactHero';
import ContactInfo from '@/components/pages/contact-us/ContactInfo';
import ContactLocation from '@/components/pages/contact-us/ContactLocation';

export const metadata = {
    title: 'Contact Us | GridCare',
    description:
        'Get in touch with GridCare. Contact our team for support, appointments, and general inquiries.',
};

export default function ContactUsPage() {
    return (
        <main className="min-h-screen bg-background">
            <ContactHero />

            <div className="container mx-auto space-y-20 px-4 py-16 md:px-6 lg:py-20">
                <ContactInfo />

                <ContactForm />

                <ContactLocation />

                <ContactFAQ />
            </div>
        </main>
    );
}
