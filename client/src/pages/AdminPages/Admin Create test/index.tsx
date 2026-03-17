import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Plus, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Question = {
  text: string;
  file: File | null;
  options: string[];
  correct_answer: string;
  codeSnippet: string;
};

const blankQuestion: Question = {
  text: "",
  file: null,
  options: ["", "", "", ""],
  correct_answer: "",
  codeSnippet: "",
};

const CreateTestForm = (): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [duration, setDuration] = useState<number>(60);
  const [questions, setQuestions] = useState<Question[]>([blankQuestion]);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const apiBase = import.meta.env.VITE_API_URL;
  const totalQuestions = questions.length;

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, { ...blankQuestion }]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      (updated[index][field] as string) = value;
      return updated;
    });
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[qIndex].options[oIndex] = value;
      return updated;
    });
  };

  const handleFileChange = (index: number, file: File | null) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index].file = file;
      return updated;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("numQuestions", String(totalQuestions));
    formData.append("duration", String(duration));

    const qData = questions.map((q) => ({
      text: q.text || null,
      options: q.options,
      correct_answer: q.correct_answer,
      codeSnippet: q.codeSnippet || null,
    }));

    formData.append("questions", JSON.stringify(qData));

    questions.forEach((q, index) => {
      if (q.file) {
        formData.append(`questionimage_${index}`, q.file);
      }
    });

    try {
      const res = await fetch(`${apiBase}/test/create`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create test");

      toast({
        title: "Test created",
        description: "Your assessment is ready for publishing.",
      });
      navigate("/admin/home");
    } catch (err) {
      console.error("Error creating test:", err);
      toast({
        title: "Unable to create test",
        description: "Please try again or check your connection.",
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
            <p className="text-sm text-muted-foreground">Admin / Assessments</p>
            <h1 className="text-3xl font-bold leading-tight bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">
              Create a New Test
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Build a branded assessment with questions, code snippets, and images. Use the logo-inspired blue & orange palette to keep it aligned with the rest of the site.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:border-brand-blue hover:text-brand-blue transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Test Details</p>
                <h2 className="text-xl font-semibold">Overview</h2>
              </div>
              <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
                {totalQuestions} question{totalQuestions === 1 ? "" : "s"}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm font-medium text-foreground">
                Test Title
                <input
                  type="text"
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  placeholder="e.g., Frontend Fundamentals"
                  className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue"
                  required
                />
              </label>

              <label className="space-y-1 text-sm font-medium text-foreground">
                Duration (minutes)
                <input
                  type="number"
                  min={10}
                  value={duration}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDuration(Number(e.target.value))}
                  className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue"
                  required
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={index} className="rounded-2xl border border-border bg-card shadow-lg p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Question {index + 1}</p>
                    <h3 className="text-lg font-semibold">Content & Options</h3>
                  </div>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(index)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
                    >
                      <X className="h-4 w-4" />
                      Remove
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="space-y-1 text-sm font-medium text-foreground">
                    Question Text
                    <input
                      type="text"
                      value={q.text}
                      onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
                      placeholder="Write the question prompt"
                      className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue"
                      required
                    />
                  </label>

                  <label className="space-y-1 text-sm font-medium text-foreground">
                    Code Snippet (optional)
                    <textarea
                      value={q.codeSnippet}
                      onChange={(e) => handleQuestionChange(index, "codeSnippet", e.target.value)}
                      placeholder="Paste any code sample the student should reference"
                      className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue"
                      rows={3}
                    />
                  </label>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Image (optional)</p>
                    <label className="flex items-center gap-3 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-brand-blue hover:text-brand-blue transition cursor-pointer">
                      <Upload className="h-4 w-4" />
                      <span>{q.file ? q.file.name : "Upload supporting image"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  {q.options.map((opt, i) => (
                    <label key={i} className="space-y-1 text-sm font-medium text-foreground">
                      Option {String.fromCharCode(65 + i)}
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => handleOptionChange(index, i, e.target.value)}
                        className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue"
                        required
                      />
                    </label>
                  ))}
                </div>

                <label className="space-y-1 text-sm font-medium text-foreground block">
                  Correct Answer
                  <select
                    value={q.correct_answer}
                    onChange={(e) => handleQuestionChange(index, "correct_answer", e.target.value)}
                    className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:ring-2 focus:ring-brand-blue"
                    required
                  >
                    <option value="">Select correct answer</option>
                    {q.options.map(
                      (opt, i) =>
                        opt && (
                          <option key={i} value={opt}>
                            {opt || `Option ${String.fromCharCode(65 + i)}`}
                          </option>
                        )
                    )}
                  </select>
                </label>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddQuestion}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-blue px-4 py-2.5 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
            >
              <Plus className="h-4 w-4" />
              Add Another Question
            </button>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/home")}
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:border-brand-orange hover:text-brand-orange transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Test"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateTestForm;
