import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../Context/Admincontext";
import Header from "../Header";
import Navbar from "../../Navbar.jsx"
import Home from "../Home";

function OutLate() {
  const { isAuthenticated } = useContext(adminContext);
  const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("");
//     }
//   }, [isAuthenticated]);

  return !isAuthenticated ? (
    <>
      <Header />
      <Navbar />
      <Home />
    </>
  ) : null;
}

export default OutLate;
