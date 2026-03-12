import {
  useEffect,
  useContext,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../Context/Admincontext";

type Student = {
  _id: string;
  name: string;
  createdAt: string;
};

type AdminContextType = {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  filteredStudents: Student[];
  setFilteredStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  visibleCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  isAuthenticated: boolean;
  checkToken: () => void;
};

function StudentList(): JSX.Element {
  const {
    students,
    setStudents,
    filteredStudents,
    setFilteredStudents,
    visibleCount,
    setVisibleCount,
    isAuthenticated,
    checkToken,
  } = useContext(adminContext) as AdminContextType;

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(!students.length);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    } else {
      checkToken();
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!students.length) {
      fetch(`${apiBase}/students/getStudents`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data: Student[]) => {
          setStudents(data);
          setFilteredStudents(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching students:", err);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    let filtered = students.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase())
    );

    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "opposite":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
        );
        break;

      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        break;

      default:
        break;
    }

    setFilteredStudents(filtered);

    if (search.trim()) {
      setVisibleCount(10);
    }
  }, [search, sortBy, students]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < filteredStudents.length) {
        setVisibleCount((prev) => prev + 10);
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleCount, filteredStudents]);

  useEffect(() => {
    const savedY = sessionStorage.getItem("scrollY");

    if (savedY) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedY));
        sessionStorage.removeItem("scrollY");
      }, 0);
    }
  }, []);

  const handleSelect = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm("Are you sure you want to delete selected students?"))
      return;

    try {
      await fetch(`${apiBase}/students/deleteMany`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ids: selectedStudents }),
      });

      const updated = students.filter(
        (s) => !selectedStudents.includes(s._id)
      );

      setStudents(updated);
      setFilteredStudents(updated);
      setSelectedStudents([]);
    } catch (error) {
      console.error("Error deleting students:", error);
    }
  };

  const studentsToDisplay = filteredStudents.slice(0, visibleCount);
  const hasMoreToLoad = visibleCount < filteredStudents.length;

  if (loading) {
    return (
      <div style={{ marginTop: "120px", textAlign: "center" }}>
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "120px" }}>
      <h3>Registered Students</h3>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search by student name..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />

        {search && (
          <button onClick={() => setSearch("")}>Clear</button>
        )}
      </div>

      {selectedStudents.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <button onClick={handleDeleteSelected}>
            Delete Selected ({selectedStudents.length})
          </button>
        </div>
      )}

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        <option value="name">Sort by Name (A-Z)</option>
        <option value="opposite">Sort by Name (Z-A)</option>
        <option value="oldest">Sort by Oldest Registration</option>
        <option value="newest">Sort by Newest Registration</option>
      </select>

      <table border={1} cellPadding={10} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Select</th>
          </tr>
        </thead>

        <tbody>
          {studentsToDisplay.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>

              <td>
                <a href={`/getStudents/${student._id}`}>
                  {student.name}
                </a>
              </td>

              <td>
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student._id)}
                  onChange={() => handleSelect(student._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {hasMoreToLoad && (
        <div ref={loadMoreRef} style={{ textAlign: "center", margin: "20px" }}>
          Loading more students...
        </div>
      )}
    </div>
  );
}

export default StudentList;