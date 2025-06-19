import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  Alert,
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
  const goToResultPage = () => {
    navigate("/student/result"); 
  };
  return (
    
    <Container className="py-4" style={{marginTop:"100px"}}>
       <Alert variant="warning" className="mb-3">
        <Alert.Heading>⚠️ Quiz Security Notice</Alert.Heading>
        <p className="mb-0">
          <strong>Important:</strong> This quiz is monitored for integrity. 
          Switching tabs, opening new windows, using developer tools, or attempting to copy content 
          will automatically submit your quiz with the current score.
        </p>
      </Alert>
    <div className="d-flex align-items-center justify-content-between mb-3">
  <h2 className="mb-0">Available Tests</h2>
   <button className="btn btn-warning" onClick={goToResultPage}>Result</button>

</div>

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
                    variant="btn btn-warning"
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
