import { useRef, useEffect, useState } from "react";
import { Briefcase, MapPin, TrendingUp } from "lucide-react";
import placed1 from "@/assets/placed1.jpg";
import placed2 from "@/assets/placed2.jpg";
import student1 from "@/assets/student1.jpg";
import student2 from "@/assets/student2.jpg";
import student3 from "@/assets/student3.jpg";

const placedStudents = [
  { name: "Arjun Meena", role: "Software Engineer", company: "TCS", package: "6.5 LPA", location: "Bangalore", image: student1 },
  { name: "Pooja Gupta", role: "Frontend Dev", company: "Infosys", package: "5.8 LPA", location: "Pune", image: placed1 },
  { name: "Nikhil Sharma", role: "Full Stack Dev", company: "Wipro", package: "7.2 LPA", location: "Hyderabad", image: placed2 },
  { name: "Anita Singh", role: "React Developer", company: "HCL", package: "6.0 LPA", location: "Noida", image: student2 },
  { name: "Rohit Jain", role: "Backend Engineer", company: "Capgemini", package: "8.0 LPA", location: "Mumbai", image: student3 },
  { name: "Meenal Rathore", role: "UI/UX Engineer", company: "Tech Mahindra", package: "5.5 LPA", location: "Jaipur", image: placed1 },
];

function PlacedCard({ s, index }: { s: typeof placedStudents[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group bg-card rounded-2xl overflow-hidden border border-border shadow-md card-hover transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={s.image}
          alt={s.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-orange text-primary-foreground text-xs font-bold">
            {s.company}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground">{s.name}</h3>
        <p className="text-sm text-brand-blue mb-3">{s.role}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <TrendingUp size={12} className="text-green-500" />
            <span className="text-green-600 font-semibold">{s.package}</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-brand-orange" /> {s.location}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={12} className="text-brand-blue" /> Placed
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PlacedStudentsSection() {
  return (
    <section id="placements" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-sm font-semibold mb-4">
            Our Placed Students
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Success is <span className="text-gradient-brand">Our Story</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            2500+ students placed in top companies. Join our growing family of successful tech professionals!
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-1 w-12 rounded-full bg-brand-blue" />
            <div className="h-1 w-4 rounded-full bg-brand-orange" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placedStudents.map((s, i) => (
            <PlacedCard key={s.name} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
