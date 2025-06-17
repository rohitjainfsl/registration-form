import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Table,
  Spinner,
  Button,
  Modal,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import instance from "../../axiosConfig";

function TestScoresPage() {
  const { id } = useParams(); 
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [emailStatus, setEmailStatus] = useState("");

  const formatDateTime = (date) => new Date(date).toLocaleString();

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await instance.get(`/test/testscore/${id}`);
        console.log(res);
        
        setAttempts(res?.data.attempts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching scores:", error);
        setLoading(false);
      }
    }
    fetchScores();
  }, [id]);

  const handleViewDetails = async (studentId) => {
    try {
      const res = await instance.get(`/test/scoreDetails/${studentId}/${id}`);
      setSelectedDetail(res.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching detailed responses:", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedDetail(null);
  };

  const handleReleaseResult = async () => {
    try {
      setEmailStatus("Sending...");
      const res = await instance.post(`/test/releaseResult/${id}`);
      setEmailStatus("Result emails sent successfully.");
    } catch (err) {
      console.error("Error sending result emails:", err);
      setEmailStatus("Failed to send result emails.");
    }
  };

  return (
    <Container className="py-4" style={{ marginTop: "100px" }}>
      <h2 className="mb-4">🧮 Test Score Details</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button as={Link} to="/admin/home" variant="secondary">
          ⬅️ Back to Dashboard
        </Button>
        <Button variant="success" onClick={handleReleaseResult}>
          Release Result
        </Button>
      </div>

      {emailStatus && (
        <Alert
          variant={
            emailStatus.includes("successfully")
              ? "success"
              : emailStatus.includes("Failed")
              ? "danger"
              : "info"
          }
        >
          {emailStatus}
        </Alert>
      )}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : attempts.length === 0 ? (
        <p>No students attempted this test.</p>
      ) : (
        <Table bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Score</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{a.studentName}</td>
                <td>{a.score}</td>
                <td>{formatDateTime(a.startTime)}</td>
                <td>{formatDateTime(a.endTime)}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleViewDetails(a.studentId)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            🧾 {selectedDetail?.studentName}'s Answers | Score:{" "}
            {selectedDetail?.score} / {selectedDetail?.responses?.length}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDetail?.responses?.map((q, idx) => (
            <div key={idx} className="mb-3 p-2 border rounded bg-light">
              <strong>Q{idx + 1}:</strong>{" "}
              {q.questionText || <em>(No text question)</em>}
              {q.questionImage && (
                <div>
                  <img
                    src={q.questionImage}
                    alt="Question"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                </div>
              )}
              <Row className="mt-2">
                <Col>
                  <strong>Correct Answer:</strong> {q.correctAnswer}
                </Col>
                <Col>
                  <strong>Selected Answer:</strong>{" "}
                  {q.selectedAnswer ? (
                    q.selectedAnswer === q.correctAnswer ? (
                      <span className="text-success">{q.selectedAnswer}</span>
                    ) : (
                      <span className="text-danger">{q.selectedAnswer}</span>
                    )
                  ) : (
                    <span className="text-warning">Not Answered</span>
                  )}
                </Col>
              </Row>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TestScoresPage;
