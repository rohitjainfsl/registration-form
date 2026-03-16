import type React from "react";
import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Loader2, PenSquare, Plus, RefreshCw, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCourses, useSaveCourse } from "@/hooks/useCourses";
import { Course, courses as defaultCourses, getCourseIcon, slugify } from "@/lib/courses";

const iconOptions = ["Layers", "Code2", "Server", "Database", "Globe", "Bot", "Smartphone"];
const badgeColors = ["bg-brand-orange", "bg-brand-blue", "bg-green-500", "bg-red-500", "bg-slate-500"];
const gradientOptions = [
  "from-brand-blue to-brand-blue-dark",
  "from-brand-orange to-brand-orange-dark",
  "from-brand-blue to-brand-orange",
  "from-brand-blue-dark to-brand-blue",
];

const emptyCourse = (orderHint = 1): Course => ({
  title: "",
  description: "",
  overview: "",
  duration: "",
  students: "",
  rating: 4.8,
  level: "",
  tags: [],
  syllabus: [],
  badge: null,
  badgeColor: "bg-brand-orange",
  color: gradientOptions[0],
  iconName: iconOptions[0],
  fee: "",
  order: orderHint,
});

export default function AdminCourseDetails() {
  const { data, isFetching, refetch } = useCourses();
  const { mutateAsync: saveCourse, isPending } = useSaveCourse();
  const { toast } = useToast();

  const courses = useMemo(() => {
    const list = data && data.length > 0 ? data : defaultCourses;
    return list.slice().sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  }, [data]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState<Course>(emptyCourse(courses.length + 1));

  const openEditor = (course?: Course) => {
    setDraft(
      course
        ? { ...course, tags: course.tags ?? [], syllabus: course.syllabus ?? [] }
        : emptyCourse(courses.length + 1)
    );
    setDialogOpen(true);
  };

  const handleField =
    (key: keyof Course) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (key === "rating" || key === "order") {
        setDraft((prev) => ({ ...prev, [key]: value ? Number(value) : undefined }));
      } else {
        setDraft((prev) => ({ ...prev, [key]: value }));
      }
    };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    try {
      const payload: Course = {
        ...draft,
        slug: draft.slug || (draft.title ? slugify(draft.title) : undefined),
      };
      await saveCourse(payload);
      toast({ title: "Course saved", description: `${payload.title || "Course"} has been updated.` });
      setDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error?.message || "Unable to save course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const previewCard = (course: Course) => {
    const Icon = getCourseIcon(course.iconName);
    const gradient = course.color || "from-brand-blue to-brand-orange";
    return (
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon className="h-5 w-5 text-brand-blue" />
                {course.title || "Untitled course"}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {course.level || "Level TBD"} | {course.duration || "Duration TBD"}
              </p>
            </div>
            {course.badge && (
              <Badge className={`${course.badgeColor} text-white`}>
                <Sparkles className="h-3 w-3 mr-1" />
                {course.badge}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">{course.description || "Description coming soon."}</p>
          <div className="flex flex-wrap gap-2">
            {(course.tags ?? []).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {course.students && <span>{course.students} learners</span>}
            {course.rating && <span>Rating {course.rating}</span>}
          </div>
          <div className={`h-1 w-full rounded-full bg-gradient-to-r ${gradient}`} />
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Control the home page course tiles</p>
            <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">
              Course Details
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Refresh
            </Button>
            <Button onClick={() => openEditor()} className="gradient-brand text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {courses.map((course) => {
            const Icon = getCourseIcon(course.iconName);
            const gradient = course.color || "from-brand-blue to-brand-orange";
            return (
              <Card
                key={course._id ?? course.slug ?? course.title}
                className="cursor-pointer border-border hover:border-brand-blue/50 transition"
                onClick={() => openEditor(course)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{course.title}</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {course.level || "Level"} | {course.duration || "Duration"} | {course.students || "Students"}
                        </p>
                      </div>
                    </div>
                    {course.badge && <Badge className={`${course.badgeColor} text-white`}>{course.badge}</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground line-clamp-3">{course.description || "Description coming soon."}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(course.tags ?? []).slice(0, 5).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {(course.tags?.length ?? 0) > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{(course.tags?.length ?? 0) - 5} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Rating: {course.rating ?? "-"}</span>
                    <span>Order: {course.order ?? "-"}</span>
                  </div>
                  <div className={`h-1 w-full rounded-full bg-gradient-to-r ${gradient}`} />
                  <div className="flex items-center gap-2 text-xs text-brand-blue">
                    <PenSquare className="h-4 w-4" />
                    Click to view & edit
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{draft._id ? "Edit Course" : "Create Course"}</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6 pb-4">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Preview</p>
                {previewCard(draft)}
                <div className="rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-brand-blue" />
                  Changes save live to the home page tiles after you hit Save.
                </div>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={draft.title} onChange={handleField("title")} required />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" value={draft.slug || ""} onChange={handleField("slug")} placeholder="auto-generated from title" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" value={draft.duration || ""} onChange={handleField("duration")} />
                  </div>
                  <div>
                    <Label htmlFor="students">Students</Label>
                    <Input id="students" value={draft.students || ""} onChange={handleField("students")} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="rating">Rating</Label>
                    <Input id="rating" type="number" step="0.1" min="0" max="5" value={draft.rating ?? ""} onChange={handleField("rating")} />
                  </div>
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <Input id="level" value={draft.level || ""} onChange={handleField("level")} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="order">Display Order</Label>
                    <Input id="order" type="number" value={draft.order ?? ""} onChange={handleField("order")} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Icon</Label>
                    <Select value={draft.iconName || iconOptions[0]} onValueChange={(val) => setDraft((prev) => ({ ...prev, iconName: val }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Gradient</Label>
                    <Select value={draft.color || gradientOptions[0]} onValueChange={(val) => setDraft((prev) => ({ ...prev, color: val }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose gradient" />
                      </SelectTrigger>
                      <SelectContent>
                        {gradientOptions.map((grad) => (
                          <SelectItem key={grad} value={grad}>
                            {grad}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="badge">Badge Label</Label>
                    <Input id="badge" value={draft.badge ?? ""} onChange={handleField("badge")} placeholder="e.g. Trending" />
                  </div>
                  <div>
                    <Label>Badge Color</Label>
                    <Select value={draft.badgeColor || badgeColors[0]} onValueChange={(val) => setDraft((prev) => ({ ...prev, badgeColor: val }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pick color" />
                      </SelectTrigger>
                      <SelectContent>
                        {badgeColors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" rows={3} value={draft.description || ""} onChange={handleField("description")} />
                </div>

                <div>
                  <Label htmlFor="overview">Overview</Label>
                  <Textarea id="overview" rows={3} value={draft.overview || ""} onChange={handleField("overview")} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Textarea
                      id="tags"
                      rows={2}
                      value={(draft.tags ?? []).join(", ")}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          tags: e.target.value
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter(Boolean),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="syllabus">Syllabus (one item per line)</Label>
                    <Textarea
                      id="syllabus"
                      rows={2}
                      value={(draft.syllabus ?? []).join("\n")}
                      onChange={(e) =>
                        setDraft((prev) => ({
                          ...prev,
                          syllabus: e.target.value
                            .split("\n")
                            .map((item) => item.trim())
                            .filter(Boolean),
                        }))
                      }
                    />
                  </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ArrowRight className="h-3 w-3" />
                    Live preview updates as you type.
                  </div>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <PenSquare className="h-4 w-4 mr-2" />}
                    Save Course
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
