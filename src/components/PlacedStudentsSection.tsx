import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Building2, TrendingUp } from "lucide-react";
import bg1 from "@/assets/bg1.jpg";
import bg2 from "@/assets/bg2.avif";
import bg3 from "@/assets/bg3.webp";
import bg4 from "@/assets/bg4.jpg";

const stats = [
  { Icon: Users, value: 500, suffix: "+", label: "Students Trained" },
  { Icon: Briefcase, value: 350, suffix: "+", label: "Students Placed" },
  { Icon: Building2, value: 100, suffix: "+", label: "Hiring Partners" },
  { Icon: TrendingUp, value: 95, suffix: "%", label: "Placement Rate" },
];

const students = [
  {img: bg1, name: "Arjun Mehta", course: "Full Stack Developer", company: "Infosys" },
  { img: bg2, name: "Kavya Nair", course: "MERN Stack", company: "TCS" },
  {img: bg3, name: "Rohan Gupta", course: "Data Analytics", company: "Wipro" },
  {img: bg4, name: "Ishita Jain", course: "UI/UX Designer", company: "Accenture" },
  {img: bg1, name: "Aditya Kumar", course: ".NET Developer", company: "HCL Tech" },
  {img: bg2, name: "Meera Das", course: "Digital Marketing", company: "Dentsu" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = Math.max(1, Math.floor(target / (duration / 16)));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(current);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-display text-3xl md:text-4xl font-bold text-primary">
      {count}{suffix}
    </div>
  );
}

const PlacedStudentsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? students : students.slice(0, 6);

  return (
    <section id="placements" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map(({ Icon, value, suffix, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6 text-center"
            >
              <Icon className="w-8 h-8 text-secondary mx-auto mb-3" />
              <AnimatedCounter target={value} suffix={suffix} />
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Success Stories</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="gradient-text">Placed Students</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 hover-lift"
            >
             <div className="w-20 h-20 rounded-full object-cover mb-4"> <img className="rounded-full w-full h-full" src={s.img} alt={s.name}  /></div>
              <h3 className="font-display font-bold text-foreground">{s.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.course}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-primary">{s.company}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {students.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              {showAll ? "Show Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlacedStudentsSection;
