import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/hooks/use-toast";
import { useAdminContext } from "@/Context/Admincontext";

type PlacedStudent = {
  _id: string;
  name: string;
  title: string;
  company: string;
  city: string;
  photo: string;
};

const AdminPlacedStudents = (): JSX.Element => {
  const [students, setStudents] = useState<PlacedStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<{
    name: string;
    title: string;
    company: string;
    city: string;
    file: File | null;
    preview: string | null;
  }>({
    name: "",
    title: "",
    company: "",
    city: "",
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
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/placed-students`);
        if (!res.ok) throw new Error("Failed to fetch placed students");
        const data = await res.json();
        setStudents(data.students ?? []);
      } catch (error) {
        console.error(error);
        toast({
          title: "Could not load placed students",
          description: "Please refresh or check your connection.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
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

  const resetForm = () => {
    if (form.preview && form.preview.startsWith("blob:")) {
      URL.revokeObjectURL(form.preview);
    }
    setEditingId(null);
    setForm({
      name: "",
      title: "",
      company: "",
      city: "",
      file: null,
      preview: null,
    });
  };

  const startEdit = (student: PlacedStudent) => {
    resetForm();
    setShowForm(true);
    setEditingId(student._id);
    setForm({
      name: student.name,
      title: student.title,
      company: student.company,
      city: student.city,
      file: null,
      preview: resolveImage(student.photo),
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !form.name.trim() ||
      !form.title.trim() ||
      !form.company.trim() ||
      !form.city.trim() ||
      (!form.file && !editingId && !form.preview)
    ) {
      toast({
        title: "Missing details",
        description: "All fields and a photo are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("name", form.name.trim());
      body.append("title", form.title.trim());
      body.append("company", form.company.trim());
      body.append("city", form.city.trim());
      if (form.file) body.append("photo", form.file);

      const isEdit = Boolean(editingId);
      const url = isEdit
        ? `${apiBase}/placed-students/${editingId}`
        : `${apiBase}/placed-students`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        body,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to save student");
      }

      const { student } = await res.json();
      setStudents((prev) =>
        isEdit
          ? prev.map((s) => (s._id === student._id ? student : s))
          : [student, ...prev],
      );
      resetForm();
      setShowForm(false);
      toast({
        title: isEdit ? "Student updated" : "Student added",
        description: "Homepage updated instantly.",
      });
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
    if (!window.confirm("Delete this placed student?")) return;
    try {
      const res = await fetch(`${apiBase}/placed-students/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setStudents((prev) => prev.filter((s) => s._id !== id));
      toast({ title: "Student removed" });
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
              Placed Students
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Keep the success wall in sync across the site. Add new student highlights with a photo, title,
              company, and city.
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm((prev) => !prev);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            {editingId ? "Close Form" : "Add New"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-border bg-white p-5 shadow-sm"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">Student Photo</label>
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
                <label className="text-sm font-medium text-foreground">Student Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                  placeholder="e.g., Priya Sharma"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Title / Role</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                  placeholder="e.g., Frontend Engineer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Company</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
                  placeholder="e.g., Accenture"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm shadow-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                  placeholder="e.g., Jaipur"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Adding a student updates both the admin view and homepage immediately (data served from the same API).
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? <Spinner className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {submitting
                  ? "Saving..."
                  : editingId
                  ? "Update Student"
                  : "Save Student"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-border px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:border-brand-orange hover:text-brand-orange"
                >
                  Cancel edit
                </button>
              )}
            </div>
          </form>
        )}

        <div className="rounded-xl border border-border bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Placed Students</h3>
              <p className="text-xs text-muted-foreground">Mirrors the homepage carousel/grid.</p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {students.length} total
            </span>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Spinner className="h-4 w-4" />
              Loading students...
            </div>
          ) : students.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-6 text-sm text-muted-foreground">
              No placed students yet. Add one to get started.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {students.map((s, idx) => (
                <div
                  key={s._id}
                  className={`group bg-card rounded-2xl overflow-hidden border border-border shadow-md card-hover transition-all duration-500 relative`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={resolveImage(s.photo)}
                      alt={s.name}
                      className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="inline-block px-3 py-1 rounded-full bg-brand-orange text-primary-foreground text-xs font-bold">
                        {s.company}
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(s)}
                          className="rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-brand-blue hover:bg-brand-blue/10 border border-border shadow-sm opacity-100"
                          aria-label="Edit student"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(s._id)}
                          className="rounded-full bg-white/90 p-1 text-red-600 hover:bg-red-50 border border-red-200 shadow-sm opacity-100"
                          aria-label="Delete student"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground">{s.name}</h3>
                    <p className="text-sm text-brand-blue mb-3">{s.title}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-brand-orange" /> {s.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase size={12} className="text-brand-blue" /> Placed
                      </span>
                    </div>
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

export default AdminPlacedStudents;
