import { createContext, useState, useEffect } from "react";
import instance from "../../axiosConfig";

export const adminContext = createContext();

export function AdminProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    checkToken();    
  }, []);


  const checkToken = async () => {
    try {
      const res = await instance.get("/auth/checkToken", {
        withCredentials: true,
      });
      
      if (res.status === 200) {
        setIsAuthenticated(true);
<<<<<<< HEAD
        setRole(res.data.role);
      }
       console.log(res.data.role)
      console.log(role)
=======
        // setRole(res.data.role);
      }
      console.log(res.data)
      // console.log(role)
>>>>>>> 5799f2bc16f05f17078cc4929fe7ee195a305cda
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setRole(null);
    }
  };  
  const LogOut = async () => {
    try {
      const res = await instance.post("/auth/logout", { withCredentials: true });
        setIsAuthenticated(false);
        setRole(null);
<<<<<<< HEAD
        // console.log(isAuthenticated)
=======
>>>>>>> 5799f2bc16f05f17078cc4929fe7ee195a305cda
        console.log(res.status);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <adminContext.Provider
      value={{
        students,
        setStudents,
        filteredStudents,
        setFilteredStudents,
        visibleCount,
        setVisibleCount,
        isAuthenticated,
        setIsAuthenticated,
        role,
        setRole,
        checkToken,
        LogOut,
      }}
    >
      {children}
    </adminContext.Provider>
  );
}
