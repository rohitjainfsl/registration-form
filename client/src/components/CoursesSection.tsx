import { useRef, useEffect, useState } from "react";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { courses } from "@/lib/courses";
import { slugify } from "@/lib/courses";

function CourseCard({ course, index }: { course: (typeof courses)[0]; index: number }) {
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

  const Icon = course.icon;

  return (
    <div
      ref={ref}
      className={`group relative bg-card rounded-2xl overflow-hidden border border-border shadow-md card-hover transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${course.color}`} />

      {/* Badge */}
      {course.badge && (
        <div className={`absolute top-4 right-4 ${course.badgeColor} text-primary-foreground text-xs font-bold px-3 py-1 rounded-full`}>
          {course.badge}
        </div>
      )}

      <div className="p-6">
        {/* Icon */}
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${course.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="text-primary-foreground" size={24} />
        </div>

        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand-blue transition-colors duration-200">
          {course.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-blue-light text-brand-blue border border-brand-blue/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-brand-orange" /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} className="text-brand-blue" /> {course.students}
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="text-yellow-500 fill-yellow-500" /> {course.rating}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground border border-border px-2.5 py-1 rounded-full">
            {course.level}
          </span>
          <Link
            to={`/courses/${slugify(course.title)}`}
            className="group/btn flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-orange transition-colors duration-200"
          >
            Learn More
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CoursesSection() {
  return (
    <section id="courses" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue-light text-brand-blue text-sm font-semibold mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-brand">Popular Courses</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Industry-aligned curriculum designed by experts. Frontend | Backend | Full Stack
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-1 w-12 rounded-full bg-brand-blue" />
            <div className="h-1 w-4 rounded-full bg-brand-orange" />
            <div className="h-1 w-2 rounded-full bg-brand-orange/50" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <CourseCard key={course.title} course={course} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#enquiry"
            onClick={(e) => { e.preventDefault(); document.querySelector("#enquiry")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-primary-foreground gradient-brand hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Enroll in a Course
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
