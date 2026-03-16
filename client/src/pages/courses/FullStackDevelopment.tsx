import CourseDetailBySlug from "@/components/CourseDetailBySlug";
import { courses } from "@/lib/courses";

export default function FullStackDevelopment() {
  const fallback = courses.find((c) => (c.slug ?? "") === "full-stack-development");
  return <CourseDetailBySlug slug="full-stack-development" fallbackCourse={fallback} />;
}
