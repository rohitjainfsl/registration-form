import React from "react";
import { courses, slugify } from "@/lib/courses";
import CourseLayout from "@/components/CourseLayout";

export default function FrontendDevelopment() {
  const course = courses.find((c) => slugify(c.title) === "frontend-development")!;
  return <CourseLayout course={course} />;
}
