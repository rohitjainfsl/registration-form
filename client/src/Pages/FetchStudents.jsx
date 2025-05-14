import React, { useEffect, useState } from "react";
import { Table, Container, Image, Spinner } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8081/api/students/getStudents", { withCredentials: true })
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
    <Container className="mt-4">
      <h3 className="mb-3">Registered Students</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Aadhar Front</th>
            <th>Aadhar Back</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.dob}</td>
              <td>{student.gender}</td>
              <td>
                <Image src={student.aadharFront} alt="Aadhar Front" thumbnail width={100} />
              </td>
              <td>
                <Image src={student.aadharBack} alt="Aadhar Back" thumbnail width={100} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default StudentList;
