import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import instance from "../../axiosConfig";

function UpdateTest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null); // original test
  const [editableTest, setEditableTest] = useState(null); // editable copy
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchTest() {
      try {
        const res = await instance.get(`/test/test/${id}`);
        setTest(res.data.test);
        setEditableTest(res.data.test);
      } catch (error) {
        console.error("Error fetching test:", error);
      }
    }
    fetchTest();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableTest((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...editableTest.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setEditableTest((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...editableTest.questions];
    const updatedOptions = [...updatedQuestions[qIndex].options];
    updatedOptions[optIndex] = value;
    updatedQuestions[qIndex] = {
      ...updatedQuestions[qIndex],
      options: updatedOptions,
    };
    setEditableTest((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  if (!test || !editableTest) {
    return <Container className="py-5">Loading test data...</Container>;
  }

  return (
    <Container className="py-6" style={{ marginTop: "120px" }}>
      <h2>Update Test</h2>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={editableTest.title}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Number of Questions</Form.Label>
              <Form.Control
                type="number"
                name="numQuestions"
                value={editableTest.numQuestions}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Duration (mins)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={editableTest.duration}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
        </Row>

        <hr />
        <h4 className="mt-4">Questions</h4>
        {editableTest.questions.map((q, idx) => (
          <div key={idx} className="mb-4 p-3 border rounded">
            <Form.Group className="mb-2">
              <Form.Label>Question {idx + 1}</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(idx, "questionText", e.target.value)
                }
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                value={q.imageUrl || ""}
                onChange={(e) =>
                  handleQuestionChange(idx, "imageUrl", e.target.value)
                }
                disabled={!isEditing}
              />
            </Form.Group>

            {q.options.map((opt, optIdx) => (
              <Form.Group key={optIdx} className="mb-2">
                <Form.Label>Option {optIdx + 1}</Form.Label>
                <Form.Control
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(idx, optIdx, e.target.value)
                  }
                  disabled={!isEditing}
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-2">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(idx, "correctAnswer", e.target.value)
                }
                disabled={!isEditing}
              />
            </Form.Group>
          </div>
        ))}

        <div className="d-flex gap-3">
          <Button
            variant={isEditing ? "success" : "warning"}
            onClick={async () => {
              if (isEditing) {
                // Save changes
                try {
                  await instance.put(`/test/update/${id}`, editableTest);
                  alert("Test updated successfully!");
                  setTest(editableTest); // Update original copy
                  setIsEditing(false);
                  navigate("/admin/home");
                } catch (error) {
                  console.error("Failed to update test:", error);
                  alert("Failed to update test.");
                }
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "Update" : "Edit"}
          </Button>

          {isEditing && (
            <Button
              variant="secondary"
              onClick={() => {
                setIsEditing(false);
                setEditableTest(test); // Reset edits
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );
}

export default UpdateTest;
