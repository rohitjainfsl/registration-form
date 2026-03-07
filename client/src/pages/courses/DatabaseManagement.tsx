import React from "react";
import { courses, slugify } from "@/lib/courses";
import CourseLayout from "@/components/CourseLayout";

export default function DatabaseManagement() {
  const course = courses.find((c) => slugify(c.title) === "database-management")!;
  return <CourseLayout course={course} />;
}
