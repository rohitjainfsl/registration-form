import React from "react";
import { courses, slugify } from "@/lib/courses";
import CourseLayout from "@/components/CourseLayout";

export default function DevOpsCloud() {
  const course = courses.find((c) => slugify(c.title) === "devops-cloud")!;
  return <CourseLayout course={course} />;
}
