import CourseDetailBySlug from "@/components/CourseDetailBySlug";
import { courses } from "@/lib/courses";

export default function FrontendDevelopment() {
  const fallback = courses.find((c) => (c.slug ?? "") === "frontend-development");
  return <CourseDetailBySlug slug="frontend-development" fallbackCourse={fallback} />;
}
