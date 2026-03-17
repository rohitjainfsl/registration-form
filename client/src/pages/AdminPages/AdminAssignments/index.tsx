import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Link as LinkIcon,
  Loader2,
  Plus,
  Video,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminContext } from "@/Context/Admincontext";

type Assignment = {
  _id: string;
  title: string;
  videoLink: string;
  createdAt: string;
};

const AdminAssignments = (): JSX.Element => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<{
    title: string;
    videoLink: string;
  }>({
    title: "",
    videoLink: "",
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, role, authChecked } = useAdminContext();
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (authChecked && (!isAuthenticated || role !== "admin")) {
      navigate("/admin/login", { replace: true });
    }
  }, [authChecked, isAuthenticated, role, navigate]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/assignments`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch assignments");
        const data = await res.json();
        setAssignments(data.assignments ?? []);
      } catch (error) {
        console.error(error);
        toast({
          title: "Could not load assignments",
          description: "Please refresh or check your connection.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [apiBase, toast]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim() || !form.videoLink.trim()) {
      toast({
        title: "Missing fields",
        description: "Title and video link are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${apiBase}/assignments`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          videoLink: form.videoLink.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to create assignment");
      }

      const { assignment } = await res.json();
      setAssignments((prev) => [assignment, ...prev]);
      setForm({ title: "", videoLink: "" });
      toast({
        title: "Assignment added",
        description: "Stored in the database and ready for future student view.",
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Admin Control Center</p>
            <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">
              Assignments Dashboard
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Upload assignment metadata once—title and video link—so it can be surfaced
              to students later without rework.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-2 text-sm text-muted-foreground">
            <Video className="h-4 w-4 text-brand-orange" />
            Admin-only for now. Student view will be wired next.
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-border bg-white p-5 shadow-sm"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 shadow-sm focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20">
                <Plus className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., React State Management Deep Dive"
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Video Link</label>
              <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 shadow-sm focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-brand-orange/20">
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                <input
                  type="url"
                  value={form.videoLink}
                  onChange={(e) => setForm((prev) => ({ ...prev, videoLink: e.target.value }))}
                  placeholder="https://..."
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Hooked to MongoDB via the new assignments API. Ready for student panel consumption.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                {submitting ? "Saving..." : "Add Assignment"}
              </button>
            </div>
          </form>

          <div className="rounded-xl border border-border bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">All Assignments</h3>
                <p className="text-xs text-muted-foreground">
                  Stored in the database and fetched dynamically.
                </p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                {assignments.length} total
              </span>
                </div>

                {loading ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                Loading assignments...
              </div>
            ) : assignments.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-6 text-sm text-muted-foreground">
                No assignments yet. Add one to populate this list.
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {assignments.map((item) => (
                  <article
                    key={item._id}
                    className="flex gap-3 rounded-lg border border-border bg-muted/30 p-3"
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-sm font-semibold text-foreground truncate" title={item.title}>
                        {item.title}
                      </p>
                      <a
                        href={item.videoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-brand-blue hover:underline break-all"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {item.videoLink}
                      </a>
                      <p className="text-[11px] text-muted-foreground">
                        Added {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAssignments;
