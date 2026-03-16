import CourseDetailBySlug from "@/components/CourseDetailBySlug";
import { courses } from "@/lib/courses";

export default function ReactNativeMobile() {
  const fallback = courses.find((c) => (c.slug ?? "") === "react-native-mobile");
  return <CourseDetailBySlug slug="react-native-mobile" fallbackCourse={fallback} />;
}
