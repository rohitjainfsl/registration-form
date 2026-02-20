import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    course: "Full Stack Developer",
    feedback: "TechNest Academy transformed my career. The hands-on projects and mentor support helped me land a role at a top MNC within 2 months of completing the course!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    course: "MERN Stack",
    feedback: "The curriculum was perfectly aligned with industry needs. The live projects gave me real confidence. I'm now working as a React developer with a great package.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    course: "UI/UX Designer",
    feedback: "From zero design knowledge to working at a design agency — TechNest made it possible. The instructors are patient and incredibly skilled.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    course: "Data Analytics",
    feedback: "The data analytics program was comprehensive. I learned Python, SQL and Power BI in a structured way. Got placed in an analytics firm right after completion.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    course: "Digital Marketing",
    feedback: "Best decision I ever made! The digital marketing course covered everything from SEO to paid ads. Now running campaigns for major brands.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    timerRef.current = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
  };

  useEffect(() => {
    start();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const go = (dir: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent((p) => (p + dir + testimonials.length) % testimonials.length);
    start();
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding bg-muted/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Student Stories</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
        </motion.div>

        <div className="mt-12 relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-card border border-border p-8 md:p-12 shadow-lg"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-4">
              {t.name[0]}
            </div>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6 italic">"{t.feedback}"</p>
            <p className="font-display font-bold text-foreground">{t.name}</p>
            <p className="text-sm text-secondary font-medium">{t.course}</p>
          </motion.div>

          {/* Nav */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button onClick={() => go(-1)} className="rounded-full border border-border p-2 hover:bg-muted transition-colors">
              <ChevronLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setCurrent(i); start(); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-border"}`}
                />
              ))}
            </div>
            <button onClick={() => go(1)} className="rounded-full border border-border p-2 hover:bg-muted transition-colors">
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
