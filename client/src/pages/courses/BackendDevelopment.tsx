import React from "react";
import { courses, slugify } from "@/lib/courses";
import CourseLayout from "@/components/CourseLayout";

export default function BackendDevelopment() {
  const course = courses.find((c) => slugify(c.title) === "backend-development")!;
  return <CourseLayout course={course} />;
}
