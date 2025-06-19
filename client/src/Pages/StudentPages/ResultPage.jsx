  import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  Spinner,
  Alert
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";

function ResultPage() {
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tests, setTests] = useState({}); // Store test details by testId
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuizAttempts() {
      try {
        setLoading(true);
        const res = await instance.get(`/students/quiz-attempts`, {
          withCredentials: true
        });
        
        // The new API already returns only released results
        if (res.data && Array.isArray(res.data)) {
          // Transform the data to match the expected format
          const formattedAttempts = res.data.map(attempt => ({
            ...attempt,
            quizAttemptId: attempt._id,
            // Test details are already included in the response
            testTitle: attempt.testTitle,
            testDuration: attempt.testDuration
          }));
          
          setQuizAttempts(formattedAttempts);
          
          // Create tests map for display purposes
          const testsMap = {};
          formattedAttempts.forEach(attempt => {
            testsMap[attempt.testId] = {
              _id: attempt.testId,
              title: attempt.testTitle,
              duration: attempt.testDuration,
              result: true // All returned tests have results released
            };
          });
          setTests(testsMap);
        }
        
      } catch (error) {
        console.error("Failed to fetch quiz attempts", error);
        setError("Failed to load quiz results. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuizAttempts();
  }, []);

  const handleViewResult = (quizAttemptId, testId) => {
    navigate(`/student/result-detail/${quizAttemptId}`, { 
      state: { testId } 
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getScoreDisplay = (attempt) => {
    if (attempt.score !== undefined && attempt.score !== null) {
      return `${attempt.score}/${attempt.responses?.length || 0}`;
    }
    return "Not completed";
  };

  const getStatusBadge = (attempt) => {
    if (attempt.endTime) {
      return <span className="badge bg-success">Completed</span>;
    }
    return <span className="badge bg-warning">In Progress</span>;
  };

  const getTestDisplay = (testId) => {
    const test = tests[testId];
    if (test) {
      return (
        <div>
          <div className="fw-bold">{test.title || 'Untitled Test'}</div>
          <small className="text-muted">
            {test.duration && `Duration: ${test.duration} min`}
          </small>
          <div>
            <span className="badge bg-success ms-2">Results Released</span>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="text-muted">Loading test details...</div>
        <small className="text-muted">
          ID: {testId?.toString().slice(-8)}...
        </small>
      </div>
    );
  };

  if (loading) {
    return (
      <Container className="text-center py-5" style={{ marginTop: "100px" }}>
        <Spinner animation="border" />
        <p className="mt-2">Loading your quiz results...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4" style={{ marginTop: "100px" }}>
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate("/student/studentpanel")}>
          Back to Tests
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ marginTop: "100px" }}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Quiz Results</h2>
        <Button 
          variant="secondary" 
          onClick={() => navigate("/student/studentpanel")}
        >
          Back to Tests
        </Button>
      </div>

      {quizAttempts.length === 0 ? (
        <Alert variant="info">
          <Alert.Heading>No Released Results</Alert.Heading>
          <p className="mb-0">
            No quiz results have been released yet. Results will appear here once your instructor releases them.
          </p>
        </Alert>
      ) : (
        <>
          <Alert variant="success" className="mb-3">
            <strong>Results Available!</strong> Your instructor has released the results for {quizAttempts.length} quiz attempt(s).
          </Alert>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Test Details</th>
                <th>Started At</th>
                <th>Status</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {quizAttempts.map((attempt) => (
                <tr key={attempt._id}>
                  <td style={{ minWidth: '200px' }}>
                    {getTestDisplay(attempt.testId)}
                  </td>
                  
                  <td>{new Date(attempt.startTime).toLocaleDateString('en-GB')}</td>
                  <td>{getStatusBadge(attempt)}</td>
                  <td>
                    <strong>{getScoreDisplay(attempt)}</strong>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleViewResult(attempt.quizAttemptId, attempt.testId)}
                      disabled={!attempt.endTime}
                    >
                      {attempt.endTime ? "View Details" : "In Progress"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}

export default ResultPage;