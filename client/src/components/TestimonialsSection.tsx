import { useRef, useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import student1 from "@/assets/student1.jpg"; // ✅ fallback fix
import NishitaGupta from "@/assets/Nishita Gupta.jpg";
import SuhaniJain from "@/assets/Suhani Jain.jpg";

const Jatin = "/images/jatin.jpeg";
const Dron = "/images/dron.png";
const PREKSHA = "/images/PREKSHA.png";
const RJ = "/images/RJ.png";
const Aakash = "/images/Aakash.png";
const Pradeep = "/images/Pradeep.png";

const testimonials = [
  {
    name: "Jatin Verma",
    image: Jatin,
    rating: 5,
    text: "I joined the coaching to learn Frontend Development and UI/UX Design, and it has been a great experience. From the basics of HTML, CSS, and JavaScript to advanced animations and responsive design, everything was taught in a clear and structured way.",
  },
  {
    name: "Dron Pareek",
    image: Dron,
    rating: 5,
    text: "The teaching style in this coaching is a bit different, which makes studying enjoyable. The teacher is very supportive, and the students are also helpful — if you have any doubt, they explain it. The environment is very friendly, and you won’t find such a good atmosphere anywhere else for such a low fee.",
  },
  {
    name: "PREKSHA GAUR",
    image: PREKSHA,
    rating: 5,
    text: "I recently attended the Hands-On Training on Tailwind CSS and React for Real-World Projects workshop. The experience was amazing! Rohit Jain Sir and Dheeraj Sir were fantastic instructors who made learning fun, interactive, and insightful.",
  },
  {
    name: "RJ Upender Swami",
    image: RJ,
    rating: 5,
    text: "Every concept is explained in a simple way, making you proficient in full stack development. Practical projects and experienced mentors prepare you to be industry-ready.",
  },
  {
    name: "Aakash Sirswa",
    image: Aakash,
    rating: 5,
    text: "It was a pleasure getting trained under Rohit sir. I started my development journey from here and learned to make responsive webpages and React in depth.",
  },
  {
    name: "Pradeep Yadav",
    image: Pradeep,
    rating: 5,
    text: "I had the privilege of enrolling in the Full Stack Learning program in Jaipur, and I can affirm that it has been an enlightening experience.",
  },
  {
    name: "Nishita Gupta",
    image: NishitaGupta,
    rating: 5,
    text: "Rohit Sir is a really great teacher. He focuses on practical learning, pays attention to every student, and he's always kind so you never feel discouraged. I finished a full stack development course with him and now I'm working in a company. Even now, he's always there to help. I really suggest him to anyone who wants to learn and improve in this field.",
  },
  {
    name: "Suhani Jain",
    image: SuhaniJain,
    rating: 5,
    text: "I enrolled myself in the front end developer course at Full stack learning that made me equipped with skills . Their teaching methodology is interactive and up-to-date rather than being a note-taking lecture. It will benefit you in the long run in this regularly updating tech world. I supremely advocate Full stack learning ...",
  },
];

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(t.image);

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
      className={`group bg-card rounded-2xl p-6 border border-border shadow-md card-hover transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Quote className="text-brand-orange mb-2 opacity-60" size={24} />

      <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
        "{t.text}"
      </p>

      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-orange/30 group-hover:ring-brand-orange transition-all duration-300">
          <img
            src={imgSrc}
            alt={t.name}
            className="w-full h-full object-cover"
            onError={() => setImgSrc(student1)} // ✅ fallback working
          />
        </div>

        <div>
          <p className="font-semibold text-foreground text-sm">{t.name}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-orange-light text-brand-orange text-sm font-semibold mb-4">
            Success Stories
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient-brand">Students Say</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real students who transformed their careers with
            FSL
          </p>

          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-1 w-12 rounded-full bg-brand-orange" />
            <div className="h-1 w-4 rounded-full bg-brand-blue" />
            <div className="h-1 w-2 rounded-full bg-brand-blue/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name + i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
