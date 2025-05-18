import { createContext, useState, useEffect } from "react";
import instance from "../../axiosConfig";

export const adminContext = createContext();

export function AdminProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const res = await instance.get("/new/checkToken", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsAuthenticated(true);
        setAdminData(res.data);
      }
      // console.log(isAuthenticated)
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setAdminData(null);
    }
  };
  const LogOut = async () => {
    try {
      const res = await instance.post("/new/logout", { withCredentials: true });
        setIsAuthenticated(false);
        setAdminData(null);
        // console.log(isAuthenticated)
        console.log(res.status);
        console.log("/")
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
        adminData,
        setAdminData,
        checkToken,
        LogOut,
      }}
    >
      {children}
    </adminContext.Provider>
  );
}
