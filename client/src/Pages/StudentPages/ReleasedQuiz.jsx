import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";

function StudentPanel() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTests() {
      try {
        const res = await instance.get("/test/allTests");
        // Only include released tests
        const releasedTests = res.data.tests.filter((test) => test.released);
        setTests(releasedTests);
      } catch (error) {
        console.error("Failed to fetch tests", error);
      }
    }

    fetchTests();
  }, []);

  const handleStartTest = (testId) => {
    navigate(`/student/quiz/${testId}`);
  };

  return (
    <Container className="py-4" style={{marginTop:"100px"}}>
      <h2 className="mb-4">Available Tests</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Questions</th>
            <th>Duration (mins)</th>
            <th>Start</th>
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
                    variant="primary"
                    onClick={() => handleStartTest(test._id)}
                  >
                    Start
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No tests available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default StudentPanel;
