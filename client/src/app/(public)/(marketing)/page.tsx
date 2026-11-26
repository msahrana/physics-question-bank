import CourseCategories from '@/components/modules/home/CourseCategories';
import ExpertTeachers from '@/components/modules/home/ExpertTeachers';
import FAQSection from '@/components/modules/home/FAQSection';
import HeroSection from '@/components/modules/home/HeroSection';
import HowItWorks from '@/components/modules/home/HowItWorks';
import LearningExperience from '@/components/modules/home/LearningExperience';
import StudentTestimonials from '@/components/modules/home/StudentTestimonials';
import WhyChooseUs from '@/components/modules/home/WhyChooseUs';

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-1 flex-col bg-white">
            <HeroSection />
            <CourseCategories />
            <WhyChooseUs />
            <HowItWorks />
            <LearningExperience />
            <ExpertTeachers />
            <StudentTestimonials />
            <FAQSection />
        </main>
    );
}
