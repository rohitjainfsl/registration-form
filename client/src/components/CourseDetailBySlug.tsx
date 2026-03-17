import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import CourseLayout from "./CourseLayout";
import { useCourse } from "@/hooks/useCourses";
import { Course } from "@/lib/courses";

type Props = {
  slug: string;
  fallbackCourse?: Course | null;
};

export default function CourseDetailBySlug({ slug, fallbackCourse }: Props) {
  const { data, isLoading, isFetching } = useCourse(slug, fallbackCourse ?? null);
  const course = data ?? fallbackCourse ?? null;

  if (isLoading && !course) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center text-muted-foreground gap-2">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading course details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-2xl font-bold">Course not found</h2>
        <p className="mt-2 text-muted-foreground">The course you requested does not exist.</p>
        <Link to="/" className="mt-4 inline-block text-brand-blue">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <>
      {isFetching && (
        <div className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Syncing latest course content...
        </div>
      )}
      <CourseLayout course={course} />
    </>
  );
}
