import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Award, ArrowRight, Code, Layers, PenTool, BarChart3, Terminal, Megaphone, Monitor, Palette } from "lucide-react";

const categories = ["All", "Development", "Design", "Marketing"];

const courses = [
  {
    title: "Full Stack Developer",
    desc: "Master frontend & backend development with modern frameworks and deployment strategies.",
    duration: "6 Months",
    category: "Development",
    Icon: Code,
  },
  {
    title: "MERN Stack",
    desc: "Build powerful web apps with MongoDB, Express, React & Node.js from scratch.",
    duration: "5 Months",
    category: "Development",
    Icon: Layers,
  },
  {
    title: ".NET Developer",
    desc: "Enterprise-grade application development with C#, ASP.NET Core and Azure cloud.",
    duration: "5 Months",
    category: "Development",
    Icon: Monitor,
  },
  {
    title: "UI/UX Designer",
    desc: "Create stunning user experiences with Figma, design systems and user research methodologies.",
    duration: "4 Months",
    category: "Design",
    Icon: PenTool,
  },
  {
    title: "Graphic Designer",
    desc: "Master Adobe Creative Suite, branding and visual communication for digital & print media.",
    duration: "4 Months",
    category: "Design",
    Icon: Palette,
  },
  {
    title: "Data Analytics",
    desc: "Analyze business data with Python, SQL, Power BI and machine learning fundamentals.",
    duration: "5 Months",
    category: "Development",
    Icon: BarChart3,
  },
  {
    title: "Python Development",
    desc: "From basics to advanced Python — web apps, automation, APIs and data science.",
    duration: "5 Months",
    category: "Development",
    Icon: Terminal,
  },
  {
    title: "Digital Marketing",
    desc: "SEO, SEM, social media, content strategy and performance marketing mastery.",
    duration: "3 Months",
    category: "Marketing",
    Icon: Megaphone,
  },
];

const CoursesSection = () => {
  const [filter, setFilter] = useState("All");

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

              <button className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
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
