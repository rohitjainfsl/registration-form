import { Navigate, useLocation } from "react-router-dom";
import { useAdminContext } from "@/Context/Admincontext";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAdminContext();
  const location = useLocation();

  if (!isAuthenticated || role !== "admin") {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
