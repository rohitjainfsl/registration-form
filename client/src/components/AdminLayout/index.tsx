import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "@/components/AdminHeader";

const AdminLayout = () => {
  const { pathname } = useLocation();
  const hideHeader = pathname.includes("/admin/login");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {!hideHeader && <AdminHeader />}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
