import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Table,
  Form,
  Modal,
  FloatingLabel,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import "../../styles/AdminHome.css";

function AdminHome() {
  const [tests, setTests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [copyTestId, setCopyTestId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDuration, setNewDuration] = useState("");
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

  const handleReleasedToggle = async (test) => {
    try {
      const updatedTest = { ...test, released: !test.released };
      await instance.put(`/test/update/${test._id}`, updatedTest);
      setTests((prev) =>
        prev.map((t) => (t._id === test._id ? updatedTest : t))
      );
    } catch (error) {
      console.error("Failed to update release status", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;
    try {
      await instance.delete(`/test/delete/${id}`);
      setTests((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Failed to delete test", error);
    }
  };

  const handleOpenCopyModal = (test) => {
    setCopyTestId(test._id);
    setNewTitle(`${test.title} Copy`);
    setNewDuration(test.duration);
    setShowModal(true);
  };

  const handleCopySubmit = async () => {
    try {
      await instance.post("/test/copyTest", {
        originalTestId: copyTestId,
        newTitle,
        newDuration,
      });
      setShowModal(false);
      setCopyTestId(null);
      setNewTitle("");
      setNewDuration("");
      const res = await instance.get("/test/allTests");
      setTests(res.data.tests);
    } catch (error) {
      console.error("Failed to create copy", error);
    }
  };

  return (
    <Container className="py-4 admin-dashboard">
      <h1 className="mb-4 header-title">Admin Dashboard</h1>

      <Row className="mb-4 action-buttons">
        <Col xs="auto">
          <Button as={Link} to="/admin/create/test" variant="primary">
            ➕ Create Test
          </Button>
        </Col>
        <Col xs="auto">
          <Button as={Link} to="/admin/fetch/students" variant="success">
            👩‍🎓 View Student Details
          </Button>
        </Col>
        <Col xs="auto">
    <Button as={Link} to="/admin/tests" variant="dark">
      View Student Results
    </Button>
  </Col>
      </Row>

      <Table striped bordered hover responsive className="test-table shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Questions</th>
            <th>Duration (mins)</th>
            <th>Released</th>
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
                  <Form.Check
                    type="switch"
                    id={`released-${test._id}`}
                    checked={test.released}
                    onChange={() => handleReleasedToggle(test)}
                  />
                </td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => navigate(`/admin/update/test/${test._id}`)}
                  >
                    ✏️ Update
                  </Button>
                  <Button
                    variant="info"
                    className="me-2"
                    onClick={() => navigate(`/admin/view/test/${test._id}`)}
                  >
                    👁️ View
                  </Button>
                  <Button
                    variant="danger"
                    className="me-2"
                    onClick={() => handleDelete(test._id)}
                  >
                    🗑️ Delete
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleOpenCopyModal(test)}
                  >
                    📋 Copy
                  </Button>
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>📋 Create Test Copy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="New Test Title" className="mb-3">
            <Form.Control
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel label="New Duration (in minutes)">
            <Form.Control
              type="number"
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCopySubmit}>
            ✅ Create Copy
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminHome;
