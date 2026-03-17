import { useEffect, useState } from "react";

type Assignment = {
  _id: string;
  title: string;
  videoLink: string;
  createdAt?: string;
};

const getEmbedUrl = (videoLink: string) => {
  try {
    const url = new URL(videoLink);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const videoId = url.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const videoId = url.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (url.pathname.startsWith("/embed/")) {
        return videoLink;
      }
    }

    if (host === "vimeo.com") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }
  } catch {
    return null;
  }

  return null;
};

function StudentAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAssignments() {
      try {
        setLoading(true);
        setError("");

        const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiBase}/assignments`, {
          credentials: "include",
        });

        const raw = await response.text();
        const data = raw ? JSON.parse(raw) : {};

        if (!response.ok) {
          throw new Error(data?.message ?? "Failed to fetch assignments.");
        }

        setAssignments(Array.isArray(data?.assignments) ? data.assignments : []);
      } catch (fetchError) {
        console.error("Failed to fetch assignments", fetchError);
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Failed to load assignments. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }

    void fetchAssignments();
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-28 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
          Student Assignments
        </p>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Assignments & Videos</h1>
          <p className="mt-2 text-sm text-slate-600">
            Watch the assignment videos and complete your work using the latest instructions shared by your mentor.
          </p>
        </div>
      </div>

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-blue" />
          <p className="mt-3 text-sm text-slate-600">Loading assignments...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && assignments.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">No assignments yet</h2>
          <p className="mt-2 text-sm text-slate-600">
            Assignment videos will appear here once they are added from the admin side.
          </p>
        </div>
      )}

      {!loading && !error && assignments.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {assignments.map((assignment) => {
            const embedUrl = getEmbedUrl(assignment.videoLink);
            const isDirectVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(assignment.videoLink);

            return (
              <article
                key={assignment._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="aspect-video bg-slate-100">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={assignment.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : isDirectVideo ? (
                    <video
                      src={assignment.videoLink}
                      className="h-full w-full"
                      controls
                      preload="metadata"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-600">
                      Preview is not available for this video source.
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold text-slate-900">{assignment.title}</h2>
                  {assignment.createdAt && (
                    <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">
                      Added on {new Date(assignment.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  )}
                  <a
                    href={assignment.videoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center rounded-lg border border-brand-blue px-4 py-2 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
                  >
                    Open Video
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default StudentAssignments;
