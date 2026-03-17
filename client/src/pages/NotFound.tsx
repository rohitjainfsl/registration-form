import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAdminContext } from "@/Context/Admincontext";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useAdminContext();

  const fallbackPath =
    role === "student" ? "/student/studentpanel" : role === "admin" ? "/admin/home" : "/";

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(fallbackPath, { replace: true });
  };

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(29,78,216,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(234,105,54,0.22),_transparent_28%),linear-gradient(180deg,_rgba(248,250,252,1)_0%,_rgba(255,255,255,1)_100%)]">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-[-6rem] top-20 h-56 w-56 rounded-full bg-brand-blue/15 blur-3xl" />
        <div className="absolute bottom-[-5rem] right-[-3rem] h-64 w-64 rounded-full bg-brand-orange/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-20 md:px-10 lg:px-16">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-blue">
          Error 404
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-tight text-slate-900 md:text-7xl">
          This page does not exist.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
          The route <span className="font-semibold text-slate-900">{location.pathname}</span> could not be found.
          It may have been moved, removed, or the URL may be incorrect.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center justify-center rounded-lg gradient-brand px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
