import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, Search, Trash2, Users, ShieldCheck, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useAdminContext } from "@/Context/Admincontext";

type Student = {
  _id: string;
  name: string;
  createdAt: string;
};

const sortOptions = [
  { value: "name", label: "Name A -> Z" },
  { value: "opposite", label: "Name Z -> A" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

const AdminViewResult = (): JSX.Element => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const { isAuthenticated, role, authChecked } = useAdminContext();
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_URL;

  // Guard route (extra safety in addition to ProtectedRoute)
  useEffect(() => {
    if (authChecked && (!isAuthenticated || role !== "admin")) {
      navigate("/admin/login", { replace: true });
    }
  }, [authChecked, isAuthenticated, role, navigate]);

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/students/getStudents`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = (await res.json()) as Student[];
        setStudents(data);
      } catch (error) {
        console.error(error);
        toast({
          title: "Unable to load students",
          description: "Please refresh or check your connection.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [apiBase, toast]);

  // Derived lists
  const filteredStudents = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    let result = students.filter((s) => s.name.toLowerCase().includes(normalized));

    switch (sortBy) {
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "opposite":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        result = [...result].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result = [...result].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        break;
    }
    return result;
  }, [students, search, sortBy]);

  const studentsToDisplay = useMemo(
    () => filteredStudents.slice(0, visibleCount),
    [filteredStudents, visibleCount]
  );

  const hasMore = visibleCount < filteredStudents.length;

  // Reset pagination on new search/sort
  useEffect(() => {
    setVisibleCount(12);
  }, [search, sortBy]);

  // Intersection observer for auto "load more"
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => prev + 10);
      }
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (!selectedIds.length) return;
    if (!window.confirm("Delete selected students? This cannot be undone.")) return;

    try {
      setDeleting(true);
      const res = await fetch(`${apiBase}/students/deleteMany`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!res.ok) throw new Error("Failed to delete students");

      setStudents((prev) => prev.filter((s) => !selectedIds.includes(s._id)));
      setSelectedIds([]);
      toast({
        title: "Deleted",
        description: "Selected student records were removed.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Delete failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Admin / Results</p>
            <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">
              Student Results
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Styled with the logo-inspired blue & orange palette so this page feels native to the rest of the site.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/home"
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:border-brand-blue hover:text-brand-blue transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Students</p>
              <p className="text-xl font-bold">{students.length}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Visible Now</p>
              <p className="text-xl font-bold">{studentsToDisplay.length}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Filtered Results</p>
              <p className="text-xl font-bold">{filteredStudents.length}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Trash2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Selected</p>
              <p className="text-xl font-bold">{selectedIds.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-lg">
          <div className="flex flex-wrap items-center gap-3 justify-between border-b border-border px-6 py-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student name..."
                className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-brand-blue"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleDeleteSelected}
                  disabled={deleting}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {deleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Delete ({selectedIds.length})
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead className="bg-muted/60">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">#</th>
                  <th className="px-6 py-3 text-left font-semibold">Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Registered</th>
                  <th className="px-6 py-3 text-left font-semibold">Select</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  Array.from({ length: 6 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <td className="px-6 py-4">
                        <div className="h-4 w-6 rounded bg-muted" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-40 rounded bg-muted" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-28 rounded bg-muted" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-10 rounded bg-muted" />
                      </td>
                    </tr>
                  ))
                ) : studentsToDisplay.length ? (
                  studentsToDisplay.map((student, index) => (
                    <tr key={student._id} className="hover:bg-muted/50 transition">
                      <td className="px-6 py-4 font-semibold text-muted-foreground">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground">
                        <a
                          href={`/getStudents/${student._id}`}
                          className="text-brand-blue hover:underline"
                        >
                          {student.name}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(student.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(student._id)}
                            onChange={() => toggleSelect(student._id)}
                            className="h-4 w-4 rounded border-border text-brand-blue focus:ring-brand-blue"
                          />
                          <span className="text-xs text-muted-foreground">Select</span>
                        </label>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
                        <CheckCircle2 className="h-4 w-4" />
                        No students found.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4 text-xs text-muted-foreground">
            <span>
              Showing {studentsToDisplay.length} of {filteredStudents.length} students
            </span>
            {hasMore && (
              <div ref={loadMoreRef} className="inline-flex items-center gap-2 text-brand-blue">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading more...
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminViewResult;
