import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Users, BookOpen, Award, TrendingUp } from "lucide-react";
import hero1 from "@/assets/hero-bg.jpg";
import hero2 from "@/assets/placed1.jpg";
import hero3 from "@/assets/placed2.jpg";

const stats = [
  { icon: Users, label: "Students Trained", value: 5000, suffix: "+" },
  { icon: BookOpen, label: "Courses", value: 15, suffix: "+" },
  { icon: Award, label: "Placements", value: 2500, suffix: "+" },
  { icon: TrendingUp, label: "Avg Salary Hike", value: 85, suffix: "%" },
];

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ icon: Icon, label, value, suffix, animate }: typeof stats[0] & { animate: boolean }) {
  const count = useCountUp(value, 2000, animate);
  return (
    <div className="flex flex-col items-center p-4 bg-background/10 backdrop-blur-sm rounded-xl border border-primary-foreground/20 hover:bg-background/20 transition-all duration-300 hover:-translate-y-1">
      <Icon className="text-brand-orange mb-2" size={24} />
      <span className="text-2xl md:text-3xl font-bold text-primary-foreground">
        {animate ? count : 0}{suffix}
      </span>
      <span className="text-xs text-primary-foreground/70 text-center mt-1">{label}</span>
    </div>
  );
}

const words = ["Full Stack Developer", "Frontend Developer", "Backend Engineer", "Web Developer"];

export default function HeroSection() {
  const images = [hero1, hero2, hero3];
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  // Word cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Slider auto-advance every 3s
  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Intersection observer for stats counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background slider */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ${i === slideIndex ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/90 via-brand-blue/75 to-brand-orange/60" />
      </div>

      {/* Animated circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full border-2 border-primary-foreground/10 animate-float opacity-30 hidden lg:block" />
      <div className="absolute bottom-32 left-10 w-40 h-40 rounded-full border border-brand-orange/30 animate-float opacity-40 hidden lg:block" style={{ animationDelay: "1s" }} />

      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-primary-foreground text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            #1 Full Stack Learning Platform in Rajasthan
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-4 animate-slide-up">
            Become A
          </h1>

          {/* Animated word */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            style={{ color: "hsl(var(--brand-orange))" }}
          >
            {words[wordIndex]}
          </h1>

          <div className="flex items-center gap-3 mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="h-0.5 w-16 bg-primary-foreground/60" />
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-light">
              in just <span className="text-5xl font-bold text-brand-orange">6</span> Months
            </p>
          </div>
          <p className="text-primary-foreground/70 text-lg mb-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            That's all the time it takes.. Join 5000+ students who transformed their careers!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <a
              href="https://registration-form-1-mbw5.onrender.com/registration"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-foreground bg-brand-orange hover:bg-brand-orange-dark transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              Join Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#courses"
              onClick={(e) => { e.preventDefault(); document.querySelector("#courses")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-foreground border-2 border-primary-foreground/50 hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-105 hover:border-primary-foreground"
            >
              <Play size={18} className="group-hover:scale-110 transition-transform duration-200" />
              Explore Courses
            </a>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} animate={statsVisible} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/50 animate-float">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-primary-foreground/50 to-transparent" />
      </div>
    </section>
  );
}
