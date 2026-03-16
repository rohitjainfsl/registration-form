import CourseDetailBySlug from "@/components/CourseDetailBySlug";
import { courses } from "@/lib/courses";

export default function DevOpsCloud() {
  const fallback = courses.find((c) => (c.slug ?? "") === "devops-cloud");
  return <CourseDetailBySlug slug="devops-cloud" fallbackCourse={fallback} />;
}
