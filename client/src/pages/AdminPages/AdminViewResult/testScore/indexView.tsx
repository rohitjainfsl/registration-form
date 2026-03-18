import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft, Eye, MailCheck } from "lucide-react";
import Spinner from "@/components/ui/Spinner";

type Attempt = {
  studentId: string;
  studentName: string;
  score: number;
  startTime: string;
  endTime: string;
};

type ResponseType = {
  questionText?: string;
  questionImage?: string;
  correctAnswer: string;
  selectedAnswer?: string;
};

type DetailType = {
  studentName: string;
  score: number;
  finishReason?: string;
  responses: ResponseType[];
};

function TestScoresPage(): JSX.Element {
  const { testId } = useParams<{ testId: string }>();

  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDetail, setSelectedDetail] = useState<DetailType | null>(null);
  const [emailStatus, setEmailStatus] = useState<string>("");
  const [testTitle, setTestTitle] = useState<string>("");
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiBase}/students/score/test/${testId}`, {
          credentials: "include",
        });
        const data = await res.json();
        setAttempts(data);
      } catch (err) {
        console.error("Error fetching attempts:", err);
        setAttempts([]);
      } finally {
        setLoading(false);
      }

      try {
        const titleRes = await fetch(`${apiBase}/test/test/${testId}`, {
          credentials: "include",
        });
        const titleData = await titleRes.json();
        setTestTitle(titleData.test?.title ?? "Unknown Test");
      } catch (err) {
        console.error("Error fetching test title:", err);
        setTestTitle("Unknown Test");
      }
    };

    fetchData();
  }, [apiBase, testId]);

  const handleViewDetails = async (studentId: string) => {
    try {
      const res = await fetch(`${apiBase}/test/scoreDetails/${studentId}/${testId}`, {
        credentials: "include",
      });
      const data = await res.json();
      setSelectedDetail(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching detailed responses:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedDetail(null);
  };

  const handleReleaseResult = async () => {
    try {
      setSendingEmail(true);
      setEmailStatus("Sending result emails...");
      await fetch(`${apiBase}/test/releaseResult/${testId}`, {
        method: "POST",
        credentials: "include",
      });
      setEmailStatus("Result emails sent successfully.");
    } catch (err) {
      console.error("Error sending result emails:", err);
      setEmailStatus("Failed to send result emails.");
    } finally {
      setSendingEmail(false);
    }
  };

  const meta = useMemo(
    () => ({
      attemptsCount: attempts.length,
    }),
    [attempts.length]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/home">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/tests">Results</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Test Scores</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-bold leading-tight text-gradient-brand">
              Scores for {testTitle || "this test"}
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              View all student attempts, open detailed responses, and release results via email.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin/tests"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:border-brand-blue hover:text-brand-blue transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Tests
            </Link>
            <button
              onClick={handleReleaseResult}
              disabled={sendingEmail}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {sendingEmail ? <Spinner className="h-4 w-4" /> : <MailCheck className="h-4 w-4" />}
              Release Result
            </button>
          </div>
        </div>

        {emailStatus && (
          <div className="rounded-xl border border-border bg-muted/60 px-4 py-3 text-sm text-foreground">
            {emailStatus}
          </div>
        )}

        <div className="rounded-2xl border border-border bg-card shadow-lg">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold">Attempts</h2>
              <p className="text-sm text-muted-foreground">
                {loading ? "Loading attempts..." : `${meta.attemptsCount} student${meta.attemptsCount === 1 ? "" : "s"} attempted`}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead className="bg-muted/60">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">#</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Student Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Score</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">Start Time</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">End Time</th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">View Answer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <td className="px-6 py-4"><div className="h-4 w-6 rounded bg-muted" /></td>
                      <td className="px-6 py-4"><div className="h-4 w-40 rounded bg-muted" /></td>
                      <td className="px-6 py-4"><div className="h-4 w-10 rounded bg-muted" /></td>
                      <td className="px-6 py-4"><div className="h-4 w-28 rounded bg-muted" /></td>
                      <td className="px-6 py-4"><div className="h-4 w-28 rounded bg-muted" /></td>
                      <td className="px-6 py-4"><div className="h-8 w-24 rounded bg-muted" /></td>
                    </tr>
                  ))
                ) : attempts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                      No students attempted this test yet.
                    </td>
                  </tr>
                ) : (
                  attempts.map((student, index) => (
                    <tr key={student.studentId} className="hover:bg-muted/50 transition">
                      <td className="px-6 py-4 font-semibold text-muted-foreground">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-foreground">{student.studentName}</td>
                      <td className="px-6 py-4 text-foreground">{student.score}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(student.startTime).toLocaleString("en-GB")}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(student.endTime).toLocaleString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewDetails(student.studentId)}
                          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:border-brand-blue hover:text-brand-blue transition"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showModal && selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-auto rounded-2xl bg-card p-6 shadow-2xl border border-border">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedDetail.studentName}'s Answers
                </h3>
                <p className="text-sm text-muted-foreground">
                  Score {selectedDetail.score}/{selectedDetail.responses.length} · Finish Reason:{" "}
                  {selectedDetail.finishReason || "N/A"}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-lg border border-border px-3 py-1.5 text-sm font-semibold hover:border-brand-orange hover:text-brand-orange transition"
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {selectedDetail.responses.map((q, idx) => {
                const correct = q.selectedAnswer && q.selectedAnswer === q.correctAnswer;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-border bg-muted/50 p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold text-foreground">
                        Q{idx + 1}: {q.questionText || "(No text question)"}
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                          q.selectedAnswer
                            ? correct
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {q.selectedAnswer ? (correct ? "Correct" : "Incorrect") : "Not Answered"}
                      </span>
                    </div>

                    {q.questionImage && (
                      <img
                        src={q.questionImage}
                        alt="Question"
                        className="mt-3 max-h-64 w-full rounded-lg object-contain bg-white"
                      />
                    )}

                    <div className="mt-3 space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        Correct Answer: <span className="font-semibold text-foreground">{q.correctAnswer}</span>
                      </p>
                      <p className="text-muted-foreground">
                        Selected Answer:{" "}
                        {q.selectedAnswer ? (
                          <span
                            className={`font-semibold ${correct ? "text-green-700" : "text-red-700"}`}
                          >
                            {q.selectedAnswer}
                          </span>
                        ) : (
                          <span className="font-semibold text-amber-700">Not Answered</span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestScoresPage;
