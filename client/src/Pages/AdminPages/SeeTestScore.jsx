import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
} from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import "../../styles/AdminHome.css";

function SeeTestCsore() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTests() {
      try {
        const res = await instance.get("/test/allTests");
        setTests(res.data.tests);
      } catch (error) {
        console.error("Failed to fetch tests", error);
      }
    } 
    fetchTests();
  }, []);



  return (
    <Container className="py-4 admin-dashboard">

      <Table striped bordered hover responsive className="test-table shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Questions</th>
            <th>Duration (mins)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tests) && tests.length > 0 ? (
            tests.map((test) => (
              <tr key={test._id}>
                <td>{test.title}</td>
                <td>{test.numQuestions}</td>
                <td>{test.duration}</td>
                <td>
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() => navigate(`/admin/testScore/${test._id}`)}
                  >
                    🧮 Show Scores
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No tests found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default SeeTestCsore;
