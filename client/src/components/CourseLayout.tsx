import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

type CourseLayoutProps = {
  course: any;
};

export default function CourseLayout({ course }: CourseLayoutProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!course) return null;

  return (
    <main className={`container mx-auto px-4 py-8 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}>
      {/* Hero */}
      <section className="rounded-3xl overflow-hidden bg-gradient-to-r from-muted/60 to-muted/40 p-6 md:p-10 mb-8 shadow-md">
        <div className="md:flex md:items-center md:justify-between gap-6">
          <div className="md:w-2/3">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to="/courses" className="inline-flex items-center gap-2 hover:underline">← Back to Courses</Link>
            </nav>

            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">{course.title}</h1>
            <p className="text-muted-foreground mt-3 max-w-2xl">{course.overview || course.description}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm">{course.level}</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm">{course.duration}</span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm">{course.students}</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="text-2xl md:text-3xl font-bold text-foreground">{course.fee}</div>
              <button className="px-5 py-2 rounded-lg gradient-brand text-white shadow hover:opacity-95 transition">Enroll Now</button>
            </div>
          </div>

          <div className="hidden md:block md:w-1/3">
            <div className="h-40 md:h-36 rounded-xl bg-gradient-to-tr from-white/30 to-muted/30 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-sm">Course</div>
                <div className="text-lg font-semibold mt-2">{course.title.split(" ")[0]}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="md:grid md:grid-cols-12 gap-8">
        <article className="md:col-span-8 space-y-6">
          <section className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-2xl font-semibold">About This Course</h2>
            <p className="text-muted-foreground mt-3">{course.description || course.overview}</p>
          </section>

          <section className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-2xl font-semibold">What You'll Learn</h2>
            <ul className="grid md:grid-cols-2 gap-3 mt-4">
              {course.syllabus?.slice(0, 6).map((s: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-2xl font-semibold">Course Syllabus</h2>
            <p className="text-muted-foreground mt-2">Expand the modules to see more details and topics.</p>

            <div className="mt-4">
              <Accordion type="single" collapsible>
                {course.syllabus?.map((s: string, i: number) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-foreground">Module {i + 1}: {s.length > 60 ? s.slice(0, 60) + '...' : s}</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground">{s}</div>
                      <ul className="mt-3 text-sm text-muted-foreground grid md:grid-cols-2 gap-2">
                        <li>• Hands-on exercises</li>
                        <li>• Mini-projects</li>
                        <li>• Quizzes & assessments</li>
                        <li>• Revision and Q&A</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </article>

        <aside className="md:col-span-4">
          <div className="sticky top-24 space-y-4">
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="font-semibold">Course Includes</h3>
              <ul className="mt-3 text-muted-foreground space-y-2">
                <li>• {course.duration}</li>
                <li>• Live interactive sessions</li>
                <li>• Hands-on projects</li>
                <li>• Certificate of completion</li>
                <li>• Placement assistance</li>
              </ul>
              <button className="mt-6 w-full px-4 py-2 rounded-lg gradient-brand text-white">Enroll Now</button>
            </div>

            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border text-sm text-muted-foreground">
              <h4 className="font-semibold">Support</h4>
              <p className="mt-2">Have questions? <Link to="/contact" className="text-brand-blue hover:underline">Contact us</Link> for guidance and batch timings.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
