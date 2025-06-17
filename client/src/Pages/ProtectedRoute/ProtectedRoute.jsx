import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../Context/Admincontext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, role} = useContext(adminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !role === `{"admin" || "student"}`) {
      navigate("/");
    }
    else{
      navigate("/admin/home")
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
