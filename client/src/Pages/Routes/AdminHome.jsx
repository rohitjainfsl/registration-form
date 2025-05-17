import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../Context/Admincontext";
import Header from "../Header.jsx";
import  Navbar  from "../../Navbar.jsx"
import Home from "../Home";
import StudentList from "../FetchStudents.jsx";

function AdminHome() {
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

  return (
    <>
      <Header />
      <Navbar />
      <Home/>
      {/* <StudentList /> */}
    </>
  );
}

export default AdminHome;