import React, { useEffect, useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";

function UpdateTest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(null);

  const [title, setTitle] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [duration, setDuration] = useState(0);
  const [released, setReleased] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]); // If your schema has options

  useEffect(() => {
    async function fetchTest() {
      try {
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
      }
    }
    fetchTest();
  }, [id]);

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
      </Form>
    </Container>
  );
}

export default UpdateTest;
