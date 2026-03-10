import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PlacedStudentsSection from "@/components/PlacedStudentsSection";
import CompaniesSection from "@/components/CompaniesSection";
import EnquiryForm from "@/components/EnquiryForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <CoursesSection />
        <TestimonialsSection />
        <PlacedStudentsSection />
        <CompaniesSection />
        <EnquiryForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
