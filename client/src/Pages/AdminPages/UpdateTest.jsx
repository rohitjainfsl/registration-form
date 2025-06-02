<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
=======
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
>>>>>>> 5799f2bc16f05f17078cc4929fe7ee195a305cda
import instance from "../../axiosConfig";

function UpdateTest() {
  const { id } = useParams();
  const navigate = useNavigate();

<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(null);

  const [title, setTitle] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [duration, setDuration] = useState(0);
  const [released, setReleased] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]); // If your schema has options
=======
  const [test, setTest] = useState(null); // original test
  const [editableTest, setEditableTest] = useState(null); // editable copy
  const [isEditing, setIsEditing] = useState(false);
>>>>>>> 5799f2bc16f05f17078cc4929fe7ee195a305cda

  useEffect(() => {
    async function fetchTest() {
      try {
<<<<<<< HEAD
        const res = await instance.get(`/test/${id}`);
        console.log("Fetched test from backend:", res.data);
        const data = res.data.test;
        setTest(data);
        setTitle(data.title);
        setNumQuestions(data.numQuestions);
        setDuration(data.duration);
        setReleased(data.released || false);
        setQuestions(data.questions || []);
        setOptions(data.options || []);
      } catch (error) {
        console.error("Failed to fetch test", error);
      } finally {
        setLoading(false);
=======
        const res = await instance.get(`/test/test/${id}`);
        setTest(res.data.test);
        setEditableTest(res.data.test);
      } catch (error) {
        console.error("Error fetching test:", error);
>>>>>>> 5799f2bc16f05f17078cc4929fe7ee195a305cda
      }
    }
    fetchTest();
  }, [id]);

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.put(`/test/update/${id}`, {
        title,
        numQuestions,
        duration,
        released,
        questions,
        options,
      });
      alert("Test updated successfully");
      navigate("/admin/home");
    } catch (error) {
      console.error("Update failed", error);
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ marginTop: "100px" }}>
      <h2 className="mb-4">Update Test</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="numQuestions" className="mb-3">
          <Form.Label>Number of Questions</Form.Label>
          <Form.Control
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            required
          />
        </Form.Group>

        <Form.Group controlId="duration" className="mb-3">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />
        </Form.Group>

        <Form.Group controlId="released" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Released"
            checked={released}
            onChange={(e) => setReleased(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Test
        </Button>
=======
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
>>>>>>> 5799f2bc16f05f17078cc4929fe7ee195a305cda
      </Form>
    </Container>
  );
}

export default UpdateTest;
