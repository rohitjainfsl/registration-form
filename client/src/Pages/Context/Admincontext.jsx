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
  }, [isAuthenticated]);

const checkToken = async () => {
    try {
      const res = await instance.get("/new/checkToken", {withCredentials:true});
      if (res.status === 200) {
        setIsAuthenticated(true);
        setAdminData(res.data);
      }
      // console.log(isAuthenticated)
    } catch (error) {
      console.error(error)
      setIsAuthenticated(false);
      setAdminData(null);
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
        checkToken,
      }}
    >
      {children}
    </adminContext.Provider>
  );
}
