import { useRef, useEffect, useState } from "react";
import { BookOpen, Users, Lightbulb, Target } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Industry-Aligned Curriculum",
    description: "Our courses are designed with input from top tech companies to ensure you learn what employers actually want.",
  },
  {
    icon: Users,
    title: "Expert Mentors",
    description: "Learn from professionals with 10+ years of industry experience at top MNCs and startups.",
  },
  {
    icon: Lightbulb,
    title: "Hands-On Learning",
    description: "Build 10+ real-world projects that you can add to your portfolio and impress recruiters.",
  },
  {
    icon: Target,
    title: "100% Placement Support",
    description: "Dedicated placement team, resume workshops, mock interviews, and direct company connections.",
  },
];

export default function AboutSection() {
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
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-sm font-semibold mb-4">
            About FSL
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            A Learning Platform To Help You{" "}
            <span className="text-gradient-brand">Jump Into Tech</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            CS Degree is no more a roadblock to work in your dream tech-based jobs. A CS degree is no longer a barrier to landing your dream tech job. Companies today prioritize skills, hands-on experience, and problem-solving abilities over formal education.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-1 w-12 rounded-full bg-brand-blue" />
            <div className="h-1 w-4 rounded-full bg-brand-orange" />
            <div className="h-1 w-2 rounded-full bg-brand-orange/50" />
          </div>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className={`group p-6 rounded-2xl border border-border bg-card shadow-sm card-hover text-center transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="inline-flex p-4 rounded-2xl gradient-brand mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon className="text-primary-foreground" size={28} />
              </div>
              <h3 className="font-bold text-foreground mb-2 group-hover:text-brand-blue transition-colors duration-200">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
