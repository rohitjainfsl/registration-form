import { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { adminContext } from "@/Context/Admincontext";
import { Eye, EyeOff } from "lucide-react";

type StudentLoginResponse = {
  message?: string;
  loginStatus: boolean;
  firstTimeSignin?: boolean;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useContext(adminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const apiBase = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiBase}/auth/studentLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as StudentLoginResponse;

      if (response.ok) {
        const { message, firstTimeSignin, loginStatus } = data;

        setSuccess(message ?? "Login successful");
        setIsAuthenticated(!!loginStatus);
        setRole("student");

        if (firstTimeSignin) {
          navigate("/student/changePassword");
        } else {
          navigate("/student/studentpanel");
        }
      } else {
        setError(data?.message ?? "Unable to login. Please try again.");
      }
    } catch (err) {
      const fallbackMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(fallbackMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-foreground">Login</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Enter your email and password to continue.
        </p>

        {error && <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {success && <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-lg border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1" htmlFor="password">
              Passwo
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full rounded-lg border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-brand-blue px-4 py-2.5 text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground">
          Don't have an account?
          <button
            type="button"
            className="text-brand-blue underline"
            onClick={() => navigate("/register")}
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}

