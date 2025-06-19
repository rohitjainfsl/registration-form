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
  const { testId } = useParams(); 
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [emailStatus, setEmailStatus] = useState("");
  const [testTitle, setTestTitle] = useState("");

  const formatDateTime = (date) => new Date(date).toLocaleString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/students/score/test/${testId}`);
        setAttempts(res.data);
        
      } catch (err) {
        console.error("Error fetching attempts:", err);
        setAttempts([]);
      } finally {
        setLoading(false);
      }

      try {
        const titleRes = await instance.get(`/test/test/${testId}`);
        setTestTitle(titleRes.data.test.title);
        
      } catch (err) {
        console.error("Error fetching test title:", err);
        setTestTitle("Unknown Test");
      }
    };
    fetchData();
  }, [testId]);

  const handleViewDetails = async (studentId) => {
    try {
      const res = await instance.get(`/test/scoreDetails/${studentId}/${testId}`);
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
      await instance.post(`/test/releaseResult/${testId}`);
      setEmailStatus("Result emails sent successfully.");
    } catch (err) {
      console.error("Error sending result emails:", err);
      setEmailStatus("Failed to send result emails.");
    }
  };

  return (
    <Container className="py-4" style={{ marginTop: "100px" }}>
      <h2 className="mb-4">🧮 Test: {testTitle}</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button as={Link} to="/admin/tests" variant="secondary">
          ⬅ Back to All Tests
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
              <th>View Answer</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.studentName}</td>
             
                <td>{student.score}</td>
               <td>{new Date(student.startTime).toLocaleString('en-GB')}</td>
<td>{new Date(student.endTime).toLocaleString('en-GB')}</td>

                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleViewDetails(student.studentId)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal */}
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
