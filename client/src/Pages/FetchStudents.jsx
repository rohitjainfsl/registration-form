import { useEffect, useState } from "react";
import { Table, Container, Button, Spinner, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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
  }, []);
  useEffect(() => {
    const filtered = students.filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

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
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search students"
          />
          {searchQuery && (
            <Button 
              variant="outline-secondary" 
              onClick={() => setSearchQuery("")}
            >
              Clear
            </Button>
          )}
        </InputGroup>
      </Form>

      {filteredStudents.length === 0 ? (
        <p className="text-center">No students found matching "{searchQuery}"</p>
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
            {filteredStudents.map((student, index) => (
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
      <p className="text-muted">
        {filteredStudents.length} of {students.length} students displayed
      </p>
    </Container>
  );
}

export default StudentList;