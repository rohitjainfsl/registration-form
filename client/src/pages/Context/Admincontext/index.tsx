import { useState, useEffect, createContext } from "react";
import { API_BASE_URL } from "../../axiosConfig";


export const adminContext = createContext();

export function AdminProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [firstTimeSignin, setFirstTimeSignin] = useState(null);

  useEffect(() => { 
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/checkToken`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setRole(data.role);
      } else {
        setIsAuthenticated(false);
        setRole(null);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setRole(null);
    }
  };

  const LogOut = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(false);
        setRole(null);
      } else {
        console.error("Logout failed:", res.statusText);
      }
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
        firstTimeSignin,
        setFirstTimeSignin,
      }}
    >
      {children}
    </adminContext.Provider>
  );
}