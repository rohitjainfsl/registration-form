import React from "react";
import { useParams, Link } from "react-router-dom";
import { courses, slugify } from "@/lib/courses";

export default function CoursePage() {
  const { slug } = useParams();
  const course = courses.find((c) => slugify(c.title) === slug);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-2xl font-bold">Course not found</h2>
        <p className="mt-2 text-muted-foreground">The course you requested does not exist.</p>
        <Link to="/" className="mt-4 inline-block text-brand-blue">Go back home</Link>
      </div>
    );
  }

  const Icon = course.icon;

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 shadow-md border border-border">
        <div className="flex items-center gap-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${course.color}`}>
            <Icon className="text-primary-foreground" size={36} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{course.level} • {course.duration} • {course.students}</p>
          </div>
        </div>

        <div className="mt-6 text-lg text-muted-foreground">
          {course.description}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {course.tags.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-brand-blue-light text-brand-blue text-sm">{t}</span>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-brand-blue to-brand-orange text-white font-semibold">Enroll Now</button>
          <Link to="/" className="text-sm text-muted-foreground">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
