import React from "react";
import { courses, slugify } from "@/lib/courses";
import CourseLayout from "@/components/CourseLayout";

export default function FullStackDevelopment() {
  const course = courses.find((c) => slugify(c.title) === "full-stack-development")!;
  return <CourseLayout course={course} />;
}
