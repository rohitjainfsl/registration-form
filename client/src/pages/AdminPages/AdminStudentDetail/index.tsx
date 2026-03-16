import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Calendar, CheckCircle2, FileText, Loader2, Pencil, User2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminContext } from "@/Context/Admincontext";
import { getPNGUrl, getPublicIdFromUrl } from "@/cloudinary";

type Student = {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  fname?: string;
  fatherName?: string;
  fphone?: string;
  fatherPhone?: string;
  laddress?: string;
  localAdd?: string;
  localAddress?: string;
  paddress?: string;
  permAdd?: string;
  permanentAddress?: string;
  role?: string;
  qualification?: string;
  qualificationYear?: string;
  batch?: string;
  college?: string;
  designation?: string;
  company?: string;
  course?: string;
  otherCourse?: string;
  referral?: string;
  friendName?: string;
  friend_name?: string;
  createdAt?: string;
  aadharFront?: string;
  aadharBack?: string;
  fees?: string;
  startDate?: string;
  remarks?: string;
};

const AdminStudentDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fees, setFees] = useState("");
  const [startDate, setStartDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const { toast } = useToast();
  const { authChecked, isAuthenticated, role } = useAdminContext();
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (authChecked && (!isAuthenticated || role !== "admin")) {
      navigate("/admin/login", { replace: true });
    }
  }, [authChecked, isAuthenticated, role, navigate]);

  useEffect(() => {
    if (!id) return;
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiBase}/students/getStudents/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch student");
        const data = (await res.json()) as Student;
        setStudent(data);
        setFees(data.fees || "");
        setStartDate(data.startDate || "");
        setRemarks(data.remarks || "");
      } catch (error) {
        console.error(error);
        toast({
          title: "Could not load student",
          description: "Please refresh or check your connection.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [apiBase, id, toast]);

  const handleUpdate = async () => {
    if (!id) return;
    try {
      setSaving(true);
      const res = await fetch(`${apiBase}/students/updateStudent/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fees, startDate, remarks }),
      });
      if (!res.ok) throw new Error("Update failed");

      setStudent((prev) =>
        prev
          ? {
              ...prev,
              fees,
              startDate,
              remarks,
            }
          : prev
      );
      toast({
        title: "Student updated",
        description: "Additional details saved successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Update failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const displayDate = useMemo(() => {
    if (!student?.createdAt) return "-";
    return new Date(student.createdAt).toLocaleDateString("en-GB");
  }, [student?.createdAt]);

  const localAddress =
    student?.laddress || student?.localAdd || student?.localAddress || "-";
  const permanentAddress =
    student?.paddress || student?.permAdd || student?.permanentAddress || "-";
  const fatherName = student?.fname || student?.fatherName || "-";
  const fatherPhone = student?.fphone || student?.fatherPhone || "-";
  const qualificationYear = student?.qualificationYear || student?.batch || "-";
  const friendName = student?.friendName || student?.friend_name || "-";

  const aadharFrontPublicId = student?.aadharFront
    ? getPublicIdFromUrl(student.aadharFront)
    : null;
  const aadharBackPublicId = student?.aadharBack
    ? getPublicIdFromUrl(student.aadharBack)
    : null;

  // Use transformed Cloudinary URL when possible; fall back to the original URL so images still render
  const aadharFrontSrc = useMemo(() => {
    if (aadharFrontPublicId) {
      const url = getPNGUrl(aadharFrontPublicId);
      if (url) return url;
    }
    return student?.aadharFront ?? "";
  }, [aadharFrontPublicId, student?.aadharFront]);

  const aadharBackSrc = useMemo(() => {
    if (aadharBackPublicId) {
      const url = getPNGUrl(aadharBackPublicId);
      if (url) return url;
    }
    return student?.aadharBack ?? "";
  }, [aadharBackPublicId, student?.aadharBack]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Admin / Students</p>
            <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">
              Student Details
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Review student profile information and update additional details.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/ViewStudent"
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:border-brand-blue hover:text-brand-blue transition"
            >
              Back to Students
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-blue" />
            <p className="mt-3 text-sm text-muted-foreground">Loading student...</p>
          </div>
        ) : !student ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm">
              <X className="h-4 w-4" />
              Student not found.
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                    <User2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Student</p>
                    <h2 className="text-xl font-semibold">{student.name}</h2>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{student.email || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{student.phone || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">DOB</p>
                    <p className="text-sm font-medium">{student.dob || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Gender</p>
                    <p className="text-sm font-medium">{student.gender || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Father's Name</p>
                    <p className="text-sm font-medium">{fatherName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Father's Phone</p>
                    <p className="text-sm font-medium">{fatherPhone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Local Address</p>
                    <p className="text-sm font-medium">{localAddress}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Permanent Address</p>
                    <p className="text-sm font-medium">{permanentAddress}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Academic</p>
                    <h3 className="text-lg font-semibold">Course Details</h3>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Role</p>
                    <p className="text-sm font-medium">{student.role || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Qualification</p>
                    <p className="text-sm font-medium">{student.qualification || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Qualification Year</p>
                    <p className="text-sm font-medium">{qualificationYear}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">College</p>
                    <p className="text-sm font-medium">{student.college || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Designation</p>
                    <p className="text-sm font-medium">{student.designation || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Company</p>
                    <p className="text-sm font-medium">{student.company || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Course</p>
                    <p className="text-sm font-medium">{student.course || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Other Course</p>
                    <p className="text-sm font-medium">{student.otherCourse || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Referral</p>
                    <p className="text-sm font-medium">{student.referral || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Friend's Name</p>
                    <p className="text-sm font-medium">{friendName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Registration Date</p>
                    <p className="text-sm font-medium">{displayDate}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Additional</p>
                    <h3 className="text-lg font-semibold">Update Details</h3>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Fees</label>
                    <input
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs text-muted-foreground">Remarks</label>
                    <textarea
                      rows={3}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pencil className="h-4 w-4" />}
                    Save Changes
                  </button>
                  <div className="text-xs text-muted-foreground">
                    {student.fees || student.startDate || student.remarks ? (
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Existing details loaded.
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-sm font-semibold mb-4">Aadhar Documents</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Front</p>
                    {aadharFrontSrc ? (
                      <img
                        src={aadharFrontSrc}
                        alt="Aadhar Front"
                        className="w-full rounded-xl border border-border"
                        loading="lazy"
                      />
                    ) : (
                      <div className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                        Not uploaded
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Back</p>
                    {aadharBackSrc ? (
                      <img
                        src={aadharBackSrc}
                        alt="Aadhar Back"
                        className="w-full rounded-xl border border-border"
                        loading="lazy"
                      />
                    ) : (
                      <div className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                        Not uploaded
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminStudentDetail;
