import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminContext } from "./Context/Admincontext";

function HomeRedirect() {
  const { role, isAuthenticated } = useContext(adminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;

    if (role === "admin") {
      navigate("/admin/home");
    } else {
      navigate("/");
    }
  }, [role, isAuthenticated, navigate]);

  return null;
}

export default HomeRedirect;
