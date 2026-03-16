import CourseDetailBySlug from "@/components/CourseDetailBySlug";
import { courses } from "@/lib/courses";

export default function BackendDevelopment() {
  const fallback = courses.find((c) => (c.slug ?? "") === "backend-development");
  return <CourseDetailBySlug slug="backend-development" fallbackCourse={fallback} />;
}
