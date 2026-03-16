import { Outlet } from "react-router-dom";
import AdminHeader from "@/components/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <AdminHeader />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
