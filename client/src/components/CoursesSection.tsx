import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Award, ArrowRight } from "lucide-react";
import { courses } from "@/data/courses";

const categories = ["All", "Development", "Design", "Marketing"];

const CoursesSection = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const filtered = filter === "All" ? courses : courses.filter((c) => c.category === filter);

  return (
    <section id="courses" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Our Programs</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
            Industry-Ready <span className="gradient-text">Courses</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Comprehensive training programs designed with industry experts to make you job-ready from day one.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl border border-border bg-card p-6 hover-lift cursor-pointer"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <course.Icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="font-display text-lg font-bold text-foreground mb-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{course.desc}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" /> {course.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
                    <Award className="w-3.5 h-3.5" /> Placement
                  </span>
                </div>
              </div>

              <button className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all" onClick={() => navigate(`/courses/${course.slug}`)}>
                View Details <ArrowRight className="w-4 h-4" />
              </button>

              {/* Urgency badge */}
              <span className="absolute top-4 right-4 rounded-full bg-urgent/10 px-3 py-1 text-[10px] font-bold text-urgent">
                Limited Seats
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
