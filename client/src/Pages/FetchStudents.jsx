import { useEffect, useState, useRef } from "react";
import { Table, Container, Button, Spinner, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setsearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const loadMoreRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    instance.get("/students/getStudents", { withCredentials: true })
      .then((res) => {
        setStudents(res.data);
        setFilteredStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setLoading(false);
      });
  }, [students]);

  useEffect(() => {
    const filtered = students.filter(student => 
      student.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(filtered);
    setVisibleCount(10); 
  }, [search, students]);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < filteredStudents.length) {
        setVisibleCount(prev => prev + 10);
      }
    });
    
    observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleCount, filteredStudents]);

  const handleSearch = (e) => {
    setsearch(e.target.value);
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
            onChange={handleSearch}
            aria-label="Search students"
          />
          {search && (
            <Button 
              variant="outline-secondary" 
              onClick={() => setsearch("")}
            >
              Clear
            </Button>
          )}
        </InputGroup>
      </Form>

      {filteredStudents.length === 0 ? (
        <p className="text-center">No students found matching "{search}"</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>
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
                    onClick={() => navigate(`/getStudents/${student._id}`)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      
      {hasMoreToLoad && (
        <div 
          ref={loadMoreRef} 
          className="text-center my-3"
        >
          <Spinner animation="border" size="sm" /> 
          <span className="ms-2">Loading more students...</span>
        </div>
      )}
      
      <p className="text-muted">
        Showing {studentsToDisplay.length} of {filteredStudents.length} matching students
        {search && ` (filtered from ${students.length} total)`}
      </p>
    </Container>
  );
}

export default StudentList;