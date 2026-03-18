import { useEffect, useMemo, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";
import student1 from "@/assets/student1.jpg"; // fallback avatar

type Testimonial = {
  _id: string;
  name: string;
  image: string;
  rating: number;
  text: string;
};

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
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
      className={`group rounded-3xl border border-border bg-white p-7 shadow-md shadow-slate-200/70 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Quote className="text-brand-orange mb-3 opacity-70" size={26} />

      <p className="text-slate-700 text-[15px] leading-relaxed mb-6 italic">
        "{t.text}"
      </p>

      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={16} className="text-yellow-400 fill-yellow-400 drop-shadow-sm" />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-orange/50 bg-white">
          <img
            src={imgSrc}
            alt={t.name}
            className="w-full h-full object-cover object-center"
            onError={() => setImgSrc(student1)}
          />
        </div>
        <p className="font-semibold text-foreground text-sm">{t.name}</p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const apiBase = import.meta.env.VITE_API_URL;
  const apiOrigin = useMemo(
    () => apiBase?.replace(/\/api$/, "") ?? "",
    [apiBase],
  );
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(`${apiBase}/success-stories`);
        if (!res.ok) throw new Error("Failed to fetch success stories");
        const data = await res.json();
        const mapped: Testimonial[] = (data.stories ?? []).map((s: any) => ({
          _id: s._id,
          name: s.name,
          rating: s.rating,
          text: s.caption,
          image: s.photo?.startsWith("http")
            ? s.photo
            : `${apiOrigin}${s.photo || ""}`,
        }));
        setTestimonials(mapped);
      } catch (error) {
        console.error(error);
        setTestimonials([]);
      }
    };

    fetchStories();
  }, [apiBase, apiOrigin]);

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

        {testimonials.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Success stories will appear here as soon as they are added.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t._id || t.name + i} t={t} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
