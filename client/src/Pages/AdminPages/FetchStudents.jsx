import { useEffect, useContext, useState, useRef } from "react";
import {
  Table,
  Container,
  Button,
  Spinner,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import { adminContext } from "../Context/Admincontext";

function StudentList() {
  const {
    students,
    setStudents,
    filteredStudents,
    setFilteredStudents,
    visibleCount,
    setVisibleCount, 
    isAuthenticated,
    checkToken
  } = useContext(adminContext);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(!students.length);
  const loadMoreRef = useRef(null);
  const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState([]);


  useEffect(() => {
  if (!isAuthenticated) {
    navigate("/admin/login");
  } else {
    checkToken(); 
  }
}, [isAuthenticated]);

  useEffect(() => {
    if (!students.length) {
      instance
        .get("/students/getStudents", { withCredentials: true })
        .then((res) => {
          setStudents(res.data);
          setFilteredStudents(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching students:", err);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(filtered);

    if (search.trim()) {
      setVisibleCount(10);
    }
  }, [search]);

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

  const handleSelect = (id) => {
  setSelectedStudents((prev) =>
    prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
  );
};
const handleDeleteSelected = async () => {
  if (!window.confirm("Are you sure you want to delete selected students?")) return;

  try {
    await instance.post("/students/deleteMany", { ids: selectedStudents }, { withCredentials: true });
    const updated = students.filter((s) => !selectedStudents.includes(s._id));
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
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading students...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h3 className="mb-3">Registered Students</h3>

      <Form className="mb-4">
        <InputGroup>
          <Form.Control
            placeholder="Search by student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Button variant="outline-secondary" onClick={() => setSearch("")}>
              Clear
            </Button>
          )}
          
        </InputGroup>
      </Form>
{selectedStudents.length > 0 && (
  <div className="mb-3">
    <Button variant="danger" onClick={handleDeleteSelected}>
      Delete Selected ({selectedStudents.length})
    </Button>
  </div>
)}
   <Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Action</th>
      <th>Select</th>
    </tr>
  </thead>
  <tbody>
    {studentsToDisplay.map((student, index) => (
      <tr key={student._id}>
        <td>{index + 1}</td>
        <td>{student.name}</td>
        <td>
          <Button
            variant="primary"
            onClick={() => {
              sessionStorage.setItem("scrollY", window.scrollY);
              navigate(`/getStudents/${student._id}`);
            }}
          >
            View
          </Button>
        </td>
        <td>
          <Form.Check
            type="checkbox"
            checked={selectedStudents.includes(student._id)}
            onChange={() => handleSelect(student._id)}
          />
        </td>
      </tr>
    ))}
  </tbody>
</Table>





      {hasMoreToLoad && (
        <div ref={loadMoreRef} className="text-center my-3">
          <Spinner animation="border" size="sm" />
          <span className="ms-2">Loading more students...</span>
        </div>
      )}
    </Container>
  );
}

export default StudentList;
