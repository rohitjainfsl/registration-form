import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Dron Pareek",
    course: "Frontend Developer",
    feedback: "The teaching style in this coaching is a bit different, which makes studying enjoyable. The teacher is very supportive, and the students are also helpful — if you have any doubt, they explain it. The environment is very friendly, and you won’t find such a good atmosphere anywhere else for such a low fee.",
    rating: 5,
  },
  {
    name: "PREKSHA GAUR",
    course: "MERN Stack",
    feedback: "I recently attended the Hands-On Training on Tailwind CSS and React for Real-World Projects workshop. The experience was amazing! Rohit Jain sir and Dheeraj sir were fantastic instructors who made learning fun and interactive and insightful. They explained complex concepts in a simple way and were always there to help us whenever we faced challenges. I gained a lot of practical knowledge that I can apply to real-world projects. Overall, it was a highly rewarding experience, and I’m grateful to both sir's for their guidance!",
    rating: 5,
  },
  {
    name: "Aakash Sirswa",
    course: "UI/UX Designer",
    feedback: "It was a pleasure getting trained under Rohit sir, He is an IT giant and an expert level trainer.I started my development journey from here. Learnt to make responsive webpages, learnt javascript react in deep.Rohit sir puts great focus on practical learning. The past part of this institute is they will support you immensely in your career journeythanks a lot for your teaching sir",
    rating: 5,
  },
  {
    name: "Gajender",
    course: "Data Analytics",
    feedback: "Rohit Sir fosters a positive and engaging environment with exceptional teaching skills. The combination of effective learning and enjoyable moments makes studying a truly fun experience",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    course: "Digital Marketing",
    feedback: "Learning Full Stack Development under Rohit Sir was truly a game-changer for me. His ability to simplify complex topics like React and Node made learning enjoyable and effective. The hands-on projects helped me gain real confidence in building complex web applications.",
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
