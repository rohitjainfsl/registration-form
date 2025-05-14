import React, { useEffect, useState } from "react";
import { Table, Container, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    instance.get("/students/getStudents", { withCredentials: true })
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setLoading(false);
      });
  }, []);

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
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/students/${student._id}`)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default StudentList;
