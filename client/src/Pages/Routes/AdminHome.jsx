import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../Context/Admincontext";
import Header from "../Header.jsx";
import  Navbar  from "../../Navbar.jsx"
import Home from "../Home";

function AdminHome() {
  const { isAuthenticated } = useContext(adminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/fetch/students");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Header />
      <Navbar />
      <Home />
    </>
  );
}

export default AdminHome;