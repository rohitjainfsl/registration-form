import React from "react";
import { courses, slugify } from "@/lib/courses";
import CourseLayout from "@/components/CourseLayout";

export default function ReactNativeMobile() {
  const course = courses.find((c) => slugify(c.title) === "react-native-mobile")!;
  return <CourseLayout course={course} />;
}
