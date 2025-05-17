import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../Context/Admincontext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(adminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/home");
    }
    else{
      navigate("/")
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
