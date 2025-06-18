import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../Context/Admincontext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, role} = useContext(adminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !role === "admin") {
      navigate("/admin/login");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
