import { useParams } from "react-router-dom";
import CourseDetailBySlug from "@/components/CourseDetailBySlug";
import { courses, slugify } from "@/lib/courses";

export default function CoursePage() {
  const { slug } = useParams();
  const fallback = slug ? courses.find((c) => (c.slug ?? slugify(c.title)) === slug) : null;

  if (!slug) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-2xl font-bold">Course not found</h2>
      </div>
    );
  }

  return <CourseDetailBySlug slug={slug} fallbackCourse={fallback ?? undefined} />;
}
