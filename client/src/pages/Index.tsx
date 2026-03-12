import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PlacedStudentsSection from "@/components/PlacedStudentsSection";
import CompaniesSection from "@/components/CompaniesSection";
import EnquiryForm from "@/components/EnquiryForm";
const Index = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <CoursesSection />        
      <PlacedStudentsSection />
      <TestimonialsSection />
      <CompaniesSection />
      <EnquiryForm />
    </main>
  );
};

export default Index;
