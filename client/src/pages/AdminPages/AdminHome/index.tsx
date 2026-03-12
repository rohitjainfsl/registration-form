import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../../Context/Admincontext";

export default function AdminHome() {
  const { LogOut } = useContext(adminContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await LogOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <p className="mt-2 text-sm text-slate-600">
              Welcome, admin! Your protected admin pages are available here.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
