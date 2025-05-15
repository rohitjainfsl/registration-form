// src/context/StudentContext.js
import { createContext, useState } from "react";

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [scrollY, setScrollY] = useState(0);

  return (
    <StudentContext.Provider
      value={{
        students,
        setStudents,
        filteredStudents,
        setFilteredStudents,
        visibleCount,
        setVisibleCount,
        scrollY,
        setScrollY,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
