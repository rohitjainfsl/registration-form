import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { Quote, Star, Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminContext } from "@/Context/Admincontext";

type Story = {
  _id: string;
  name: string;
  caption: string;
  rating: number;
  photo: string;
};

const ratingOptions = [1, 2, 3, 4, 5];

const StoryCard = ({ story }: { story: Story }) => (
  <div className="group rounded-3xl border border-border bg-white p-6 shadow-lg shadow-slate-200/60 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
    <Quote className="text-brand-orange mb-3 opacity-70" size={26} />

    <p className="text-slate-700 text-[15px] leading-relaxed mb-5 italic">
      "{story.caption}"
    </p>

    <div className="flex items-center gap-1 mb-5">
      {Array.from({ length: story.rating }).map((_, i) => (
        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400 drop-shadow-sm" />
      ))}
    </div>

    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-orange/50 bg-white">
        <img
          src={story.photo}
          alt={story.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <p className="font-semibold text-foreground text-sm">{story.name}</p>
    </div>
  </div>
);

const AdminSuccessStories = (): JSX.Element => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<{
    name: string;
    caption: string;
    rating: number;
    file: File | null;
    preview: string | null;
  }>({
    name: "",
    caption: "",
    rating: 5,
    file: null,
    preview: null,
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, role, authChecked } = useAdminContext();
  const apiBase = import.meta.env.VITE_API_URL;

  const apiOrigin = useMemo(
    () => apiBase?.replace(/\/api$/, "") ?? "",
    [apiBase],
  );

  const resolveImage = (src: string) =>
    src?.startsWith("http") ? src : `${apiOrigin}${src}`;

  useEffect(() => {
    if (authChecked && (!isAuthenticated || role !== "admin")) {
      navigate("/admin/login", { replace: true });
    }
  }, [authChecked, isAuthenticated, role, navigate]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/success-stories`);
        if (!res.ok) throw new Error("Failed to fetch success stories");
        const data = await res.json();
        const mapped: Story[] = (data.stories ?? []).map((s: any) => ({
          _id: s._id,
          name: s.name,
          caption: s.caption,
          rating: s.rating,
          photo: resolveImage(s.photo),
        }));
        setStories(mapped);
      } catch (error) {
        console.error(error);
        toast({
          title: "Could not load success stories",
          description: "Please refresh or check your connection.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [apiBase, toast]);

  useEffect(
    () => () => {
      if (form.preview) URL.revokeObjectURL(form.preview);
    },
    [form.preview],
  );

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setForm((prev) => ({ ...prev, file: null, preview: null }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      file,
      preview: URL.createObjectURL(file),
    }));
  };

  const clearImage = () => {
    if (form.preview) URL.revokeObjectURL(form.preview);
    setForm((prev) => ({ ...prev, file: null, preview: null }));
  };

  const startEdit = (story: Story) => {
    if (form.preview && form.preview.startsWith("blob:")) {
      URL.revokeObjectURL(form.preview);
    }
    setEditingId(story._id);
    setForm({
      name: story.name,
      caption: story.caption,
      rating: story.rating,
      file: null,
      preview: story.photo,
    });
  };

  const resetForm = () => {
    if (form.preview && form.preview.startsWith("blob:")) {
      URL.revokeObjectURL(form.preview);
    }
    setEditingId(null);
    setForm({
      name: "",
      caption: "",
      rating: 5,
      file: null,
      preview: null,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !form.name.trim() ||
      !form.caption.trim() ||
      !form.rating ||
      (!form.file && !editingId && !form.preview)
    ) {
      toast({
        title: "Missing fields",
        description: "Name, caption, rating, and photo are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("name", form.name.trim());
      body.append("caption", form.caption.trim());
      body.append("rating", String(form.rating));
      if (form.file) body.append("photo", form.file);

      const isEdit = Boolean(editingId);
      const url = isEdit
        ? `${apiBase}/success-stories/${editingId}`
        : `${apiBase}/success-stories`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        body,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to save success story");
      }

      const { story } = await res.json();
      const normalized = { ...story, photo: resolveImage(story.photo) };
      setStories((prev) =>
        isEdit
          ? prev.map((s) => (s._id === story._id ? normalized : s))
          : [normalized, ...prev],
      );
      resetForm();
      toast({ title: isEdit ? "Success story updated" : "Success story added" });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Save failed",
        description: error?.message ?? "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this success story?")) return;
    try {
      const res = await fetch(`${apiBase}/success-stories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setStories((prev) => prev.filter((s) => s._id !== id));
      toast({ title: "Story deleted" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Delete failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Admin Control Center</p>
            <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">
              Success Stories
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Manage the homepage testimonials from here. Add a quote, rating, image, and name.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-border bg-white p-5 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-foreground">Story Image</label>
              <div className="flex flex-wrap items-center gap-3">
                <label className="group flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground hover:border-brand-blue">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-brand-blue" />
                    <span className="font-medium text-foreground/80">
                      {form.file ? form.file.name : "Upload an image"}
                    </span>
                  </div>
                  <span className="rounded-md bg-white px-3 py-1 text-xs font-semibold text-brand-blue shadow-sm">
                    Browse
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFile}
                  />
                </label>
                {form.file && (
                  <button
                    type="button"
                    onClick={clearImage}
                    className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:border-brand-orange hover:text-brand-orange"
                  >
                    Clear image
                  </button>
                )}
              </div>
              {form.preview && (
                <div className="h-40 overflow-hidden rounded-lg border border-border bg-white">
                  <img
                    src={form.preview}
                    alt="Preview"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                placeholder="Student name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Rating</label>
              <select
                value={form.rating}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, rating: Number(e.target.value) }))
                }
                className="w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
              >
                {ratingOptions.map((r) => (
                  <option key={r} value={r}>
                    {r} Stars
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-foreground">Caption</label>
              <textarea
                value={form.caption}
                onChange={(e) => setForm((prev) => ({ ...prev, caption: e.target.value }))}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                placeholder="Short testimonial text"
                rows={3}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              These stories appear on the homepage immediately after saving.
            </p>
            <div className="flex items-center gap-2">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:border-brand-orange hover:text-brand-orange"
                >
                  Cancel edit
                </button>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Saving..." : editingId ? "Update Story" : "Add Story"}
              </button>
            </div>
          </div>
        </form>

        <div className="rounded-xl border border-border bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Success Stories</h3>
              <p className="text-xs text-muted-foreground">Mirrors the homepage testimonials.</p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {stories.length} total
            </span>
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading stories...</p>
          ) : stories.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-6 text-sm text-muted-foreground">
              No success stories yet. Add one to populate the homepage section.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <div key={story._id} className="relative">
                  <StoryCard story={story} />
                  <div className="absolute top-3 right-3 flex gap-2 opacity-100">
                    <button
                      type="button"
                      onClick={() => startEdit(story)}
                      className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-blue hover:bg-brand-blue/10 border border-border shadow-sm"
                      aria-label="Edit story"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(story._id)}
                      className="rounded-full bg-white/95 p-2 text-red-600 hover:bg-red-50 border border-red-200 shadow-sm"
                      aria-label="Delete story"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminSuccessStories;
