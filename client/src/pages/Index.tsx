import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoursesSection from "@/components/CoursesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PlacedStudentsSection from "@/components/PlacedStudentsSection";
import CompaniesSection from "@/components/CompaniesSection";
import EnquirySection from "@/components/EnquirySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CoursesSection />
      <TestimonialsSection />
      <PlacedStudentsSection />
      <CompaniesSection />
      <EnquirySection />
      <Footer />
    </main>
  );
};

export default Index;
