import { useState } from "react";
import { Form, Button, Col, Row, Card, Container } from "react-bootstrap";
// import axios from "axios";
import instance from "../../axiosConfig";

const CreateTestForm = () => {
  const [title, setTitle] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [duration, setDuration] = useState(60);
  const [questions, setQuestions] = useState([
    {
      text: "",
      file: null,
      options: ["", "", "", ""],
      correct_answer: "",
      codeSnippet: "",
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        file: null,
        options: ["", "", "", ""],
        correct_answer: "",
        codeSnippet: "",
      },
    ]);
    setNumQuestions(questions.length + 1);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...questions];
    updated[index].file = file;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("numQuestions", numQuestions);
    formData.append("duration", duration);

    const qData = questions.map((q) => ({
      text: q.text,
      options: q.options,
      correct_answer: q.correct_answer,
      codeSnippet: q.codeSnippet,
    }));

    formData.append("questions", JSON.stringify(qData));

    questions.forEach((q, index) => {
      if (q.file) {
        formData.append("questionimage", q.file); 
      }
    });

    try {
      const res = await instance.post("/test/create", formData); 
      alert("Test Created Successfully!");
    } catch (err) {
      console.error("Error creating test:", err);
      alert("Error creating test");
    }
  };

  return (
    <Container style={{marginTop:"120px"}}>
      <h2 className="my-4"  >Create New Test</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Test Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </Form.Group>

        {questions.map((q, index) => (
          <Card className="mb-4" key={index}>
            <Card.Body>
              <Card.Title>Question {index + 1}</Card.Title>

              <Form.Group className="mb-3">
                <Form.Label>Text</Form.Label>
                <Form.Control
                  type="text"
                  value={q.text}
                  onChange={(e) =>
                    handleQuestionChange(index, "text", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image (optional)</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(index, e.target.files[0])
                  }
                />
              </Form.Group>

              <Row>
                {q.options.map((opt, i) => (
                  <Col md={6} key={i}>
                    <Form.Group className="mb-3">
                      <Form.Label>Option {String.fromCharCode(65 + i)}</Form.Label>
                      <Form.Control
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(index, i, e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Correct Answer</Form.Label>
                <Form.Control
                  type="text"
                  value={q.correct_answer}
                  onChange={(e) =>
                    handleQuestionChange(index, "correct_answer", e.target.value)
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Code Snippet (optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={q.codeSnippet}
                  onChange={(e) =>
                    handleQuestionChange(index, "codeSnippet", e.target.value)
                  }
                />
              </Form.Group>
            </Card.Body>
          </Card>
        ))}

        <Button variant="secondary" onClick={handleAddQuestion}>
          Add Another Question
        </Button>

        <Button variant="primary" type="submit" className="ms-3">
          Create Test
        </Button>
      </Form>
    </Container>
  );
};

export default CreateTestForm;
