import { Navigate } from "react-router-dom";
import { useAdminContext } from "@/Context/Admincontext";

type StudentPublicRouteProps = {
  children: JSX.Element;
  redirectTo: string;
};

const StudentPublicRoute = ({
  children,
  redirectTo,
}: StudentPublicRouteProps) => {
  const { isAuthenticated, role, authChecked } = useAdminContext();

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Checking session...
      </div>
    );
  }

  if (isAuthenticated && role === "student") {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default StudentPublicRoute;
