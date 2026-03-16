import CourseDetailBySlug from "@/components/CourseDetailBySlug";
import { courses } from "@/lib/courses";

export default function DatabaseManagement() {
  const fallback = courses.find((c) => (c.slug ?? "") === "database-management");
  return <CourseDetailBySlug slug="database-management" fallbackCourse={fallback} />;
}
