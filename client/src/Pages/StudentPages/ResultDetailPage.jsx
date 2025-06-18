import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Card,
  Badge,
  Spinner,
  Alert,
  Row,
  Col
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../axiosConfig";

function ResultDetailPage() {
  const [resultDetail, setResultDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { quizAttemptId } = useParams();

  useEffect(() => {
    async function fetchResultDetail() {
      try {
        setLoading(true);
        const res = await instance.get(`/students/quiz-attempt-detail/${quizAttemptId}`, {
          withCredentials: true
        });
        setResultDetail(res.data);
      } catch (error) {
        console.error("Failed to fetch result details", error);
        if (error.response?.status === 403) {
          setError("Results not yet released for this test.");
        } else if (error.response?.status === 404) {
          setError("Quiz attempt not found.");
        } else {
          setError("Failed to load result details. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    if (quizAttemptId) {
      fetchResultDetail();
    }
  }, [quizAttemptId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const calculateTimeTaken = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInMinutes = Math.floor((end - start) / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getScorePercentage = (score, total) => {
    return Math.round((score / total) * 100);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return "success";
    if (percentage >= 60) return "warning";
    return "danger";
  };

  if (loading) {
    return (
      <Container className="text-center py-5" style={{ marginTop: "100px" }}>
        <Spinner animation="border" />
        <p className="mt-2">Loading result details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4" style={{ marginTop: "100px" }}>
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate("/student/results")}>
          Back to Results
        </Button>
      </Container>
    );
  }

  if (!resultDetail) {
    return (
      <Container className="py-4" style={{ marginTop: "100px" }}>
        <Alert variant="warning">No result details found.</Alert>
        <Button variant="primary" onClick={() => navigate("/student/results")}>
          Back to Results
        </Button>
      </Container>
    );
  }

  const scorePercentage = getScorePercentage(resultDetail.score, resultDetail.totalQuestions);
  const scoreColor = getScoreColor(scorePercentage);

  return (
    <Container className="py-4" style={{ marginTop: "100px" }}>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="mb-0">Quiz Result Details</h2>
        <Button 
          variant="secondary" 
          onClick={() => navigate("/student/results")}
        >
          Back to Results
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="mb-4">
        <Card.Header>
          <h4 className="mb-0">{resultDetail.testTitle}</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Student:</strong> {resultDetail.studentName}</p>
              <p><strong>Started:</strong> {formatDate(resultDetail.startTime)}</p>
              <p><strong>Completed:</strong> {formatDate(resultDetail.endTime)}</p>
              <p><strong>Time Taken:</strong> {calculateTimeTaken(resultDetail.startTime, resultDetail.endTime)}</p>
            </Col>
            <Col md={6}>
              <p><strong>Test Duration:</strong> {resultDetail.testDuration} minutes</p>
              <p><strong>Total Questions:</strong> {resultDetail.totalQuestions}</p>
              <p>
                <strong>Score:</strong> 
                <Badge bg={scoreColor} className="ms-2 fs-6">
                  {resultDetail.score}/{resultDetail.totalQuestions} ({scorePercentage}%)
                </Badge>
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Questions and Answers */}
      <h4 className="mb-3">Question-wise Analysis</h4>
      {resultDetail.responses.map((response, index) => (
        <Card key={index} className="mb-3">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span><strong>Question {index + 1}</strong></span>
            <Badge bg={response.isCorrect ? "success" : "danger"}>
              {response.isCorrect ? "Correct" : "Incorrect"}
            </Badge>
          </Card.Header>
          <Card.Body>
            {/* Question Text */}
            {response.questionText && (
              <div className="mb-3">
                <h6>Question:</h6>
                <p>{response.questionText}</p>
              </div>
            )}

            {/* Question Image */}
            {response.questionImage && (
              <div className="mb-3">
                <img 
                  src={response.questionImage} 
                  alt="Question"
                  className="img-fluid"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}

            {/* Options */}
            {response.options && response.options.length > 0 && (
              <div className="mb-3">
                <h6>Options:</h6>
                <ul className="list-unstyled">
                  {response.options.map((option, optIndex) => {
                    const isCorrect = option === response.correctAnswer;
                    const isSelected = option === response.selectedAnswer;
                    
                    let badgeColor = "";
                    if (isCorrect && isSelected) badgeColor = "success";
                    else if (isCorrect) badgeColor = "success";
                    else if (isSelected) badgeColor = "danger";
                    else badgeColor = "light";
                    
                    return (
                      <li key={optIndex} className="mb-1">
                        <Badge bg={badgeColor} className="me-2">
                          {String.fromCharCode(65 + optIndex)}
                        </Badge>
                        {option}
                        {isCorrect && (
                          <small className="text-success ms-2">(Correct Answer)</small>
                        )}
                        {isSelected && !isCorrect && (
                          <small className="text-danger ms-2">(Your Answer)</small>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Answer Summary */}
            <Row>
              <Col md={6}>
                <small className="text-muted">
                  <strong>Your Answer:</strong> {response.selectedAnswer || "Not answered"}
                </small>
              </Col>
              <Col md={6}>
                <small className="text-muted">
                  <strong>Correct Answer:</strong> {response.correctAnswer}
                </small>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      {/* Footer Summary */}
      <Card className="mt-4">
        <Card.Body className="text-center">
          <h5>Final Score</h5>
          <h2 className={`text-${scoreColor}`}>
            {resultDetail.score}/{resultDetail.totalQuestions} ({scorePercentage}%)
          </h2>
          <p className="text-muted mb-0">
            {scorePercentage >= 80 ? "Excellent!" : 
             scorePercentage >= 60 ? "Good effort!" : 
             "Keep practicing!"}
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ResultDetailPage;