import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

type Role = "student" | "admin" | null;

type AdminContextValue = {
  students: unknown[];
  setStudents: Dispatch<SetStateAction<unknown[]>>;
  filteredStudents: unknown[];
  setFilteredStudents: Dispatch<SetStateAction<unknown[]>>;
  visibleCount: number;
  setVisibleCount: Dispatch<SetStateAction<number>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  role: Role;
  setRole: Dispatch<SetStateAction<Role>>;
  checkToken: () => Promise<void>;
  LogOut: () => Promise<void>;
  firstTimeSignin: boolean | null;
  setFirstTimeSignin: Dispatch<SetStateAction<boolean | null>>;
};

const noop = async () => {};

export const adminContext = createContext<AdminContextValue>({
  students: [],
  setStudents: () => {},
  filteredStudents: [],
  setFilteredStudents: () => {},
  visibleCount: 10,
  setVisibleCount: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  role: null,
  setRole: () => {},
  checkToken: noop,
  LogOut: noop,
  firstTimeSignin: null,
  setFirstTimeSignin: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>(null);
  const [firstTimeSignin, setFirstTimeSignin] = useState<boolean | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

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