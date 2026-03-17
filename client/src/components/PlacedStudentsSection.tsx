import { useRef, useEffect, useState } from "react";
import { Briefcase, MapPin, TrendingUp } from "lucide-react";
import BharatPareek from "@/assets/Bharat Pareek.jpg";
import NishitaGupta from "@/assets/Nishita Gupta.jpg";
import SuhaniJain from "@/assets/Suhani Jain.jpg";
import RanveerSingh from "@/assets/Ranveer Singh.jpg";
import RishabhJangir from "@/assets/Rishabh Jangir.jpg";
import RiyaAnand from "@/assets/Riya Anand.jpg";
import DeepeshSuiwal from "@/assets/Deepesh Suiwal.png";
import TanmayShukla from "@/assets/Tanmay Shukla.jpg";
import RitikSaluja from "@/assets/Ritik Saluja.jpg";
import RajatJain from "@/assets/Rajat Jain.jpg";
import RajatJainNagarro from "@/assets/Rajat Jain Nagarro.jpg";
import Blank from "@/assets/blank.png";

const placedStudents = [
  {
    name: "Nishita Gupta",
    role: "Software Engineer",
    company: "Accenture",
    location: "Gurugram",
    image: NishitaGupta,
  },
  {
    name: "Deepesh Suiwal",
    role: "Full Stack Dev",
    company: "Hidden Mind Solutions",
    location: "Udaipur",
    image: DeepeshSuiwal,
  },
  {
    name: "Suhani Jain",
    role: "Full Stack Dev",
    company: "Celebal",
    location: "Jaipur",
    image: SuhaniJain,
  },
  {
    name: "Ranveer Singh",
    role: "Frontend Developer",
    company: "Vaibhav Global",
    location: "Jaipur",
    image: RanveerSingh,
  },
  {
    name: "Riya Anand",
    role: "SEO",
    company: "Vaibhav Global",
    location: "Jaipur",
    image: RiyaAnand,
  },
  {
    name: "Bharat Pareek",
    role: "Full Stack Dev",
    company: "My Saathi Tech",
    location: "Bikaner",
    image: BharatPareek,
  },
  {
    name: "Tanmay Shukla",
    role: "UI/UX Engineer",
    company: "Vaibhav Global",
    location: "Jaipur",
    image: TanmayShukla,
  },
  {
    name: "Ritik Saluja",
    role: "Full Stack Dev",
    company: "Dev Technosys",
    location: "Jaipur",
    image: RitikSaluja,
  },
  {
    name: "Rishabh Jangir",
    role: "UI/UX Engineer",
    company: "Vaibhav Global",
    location: "Jaipur",
    image: RishabhJangir,
  },
  {
    name: "Rajat Jain",
    role: "Unqork developer",
    company: "Genpact",
    location: "Jaipur",
    image: RajatJain,
  },
  {
    name: "Rajat Jain",
    role: "Frontend Engineer",
    company: "Nagarro",
    location: "Jaipur",
    image: RajatJainNagarro,
  },
];

function PlacedCard({
  s,
  index,
}: {
  s: (typeof placedStudents)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
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

function PlaceholderCard({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
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
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={Blank}
          alt="Future student"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 m-2 pointer-events-none" />
      </div>
      <div className="p-5 flex flex-col items-center text-center space-y-3">
        <h3 className="font-bold text-lg text-foreground">
          This could be you.
        </h3>

        <p className="text-sm text-muted-foreground max-w-[220px]">
          Enroll today and join our wall of success.
        </p>

        <a
          href="/register"
          className="mt-2 w-full px-5 py-3 rounded-lg text-sm font-semibold text-primary-foreground gradient-brand hover:opacity-90 transition-all duration-200"
        >
          Enroll Now
        </a>
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
            2500+ students placed in top companies. Join our growing family of
            successful tech professionals!
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-1 w-12 rounded-full bg-brand-blue" />
            <div className="h-1 w-4 rounded-full bg-brand-orange" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {placedStudents.map((s, i) => (
            <PlacedCard key={`${s.name}-${s.company}`} s={s} index={i} />
          ))}
          <PlaceholderCard index={placedStudents.length} />
        </div>
      </div>
    </section>
  );
}
