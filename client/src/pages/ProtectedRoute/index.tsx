import { Navigate, useLocation } from "react-router-dom";
import { useAdminContext } from "@/Context/Admincontext";

type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles: Array<"admin" | "student">;
  redirectTo: string;
};

const ProtectedRoute = ({ children, allowedRoles, redirectTo }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAdminContext();
  const location = useLocation();

  if (!isAuthenticated || !role || !allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
