import { createContext, useState, useEffect} from "react";
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
        setRole(res.data.role);
      }
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

        // console.log(isAuthenticated)

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
