import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Role = "student" | "admin" | null;

type AdminContextValue = {
  isAuthenticated: boolean;
  role: Role;
  setIsAuthenticated: (value: boolean) => void;
  setRole: (role: Role) => void;
};

const noop = () => {};

export const adminContext = createContext<AdminContextValue>({
  isAuthenticated: false,
  role: null,
  setIsAuthenticated: noop,
  setRole: noop,
});

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>(null);

  const value = useMemo(
    () => ({
      isAuthenticated,
      role,
      setIsAuthenticated,
      setRole,
    }),
    [isAuthenticated, role]
  );

  return <adminContext.Provider value={value}>{children}</adminContext.Provider>;
};

export const useAdminContext = () => useContext(adminContext);
