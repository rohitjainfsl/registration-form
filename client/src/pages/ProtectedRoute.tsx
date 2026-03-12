import { Navigate, useLocation } from "react-router-dom";
import { useAdminContext } from "@/Context/Admincontext";

type Role = "admin" | "student";

type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles?: Role[];
  redirectTo?: string;
};

const ProtectedRoute = ({ children, allowedRoles, redirectTo = "/login" }: ProtectedRouteProps) => {
  const { isAuthenticated, role, authChecked } = useAdminContext();
  const location = useLocation();

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Checking session...
      </div>
    );
  }

  const isAllowed =
    isAuthenticated &&
    (!allowedRoles || (role && allowedRoles.includes(role as Role)));

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
