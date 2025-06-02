import { useEffect, useState } from "react";
import { Container, Spinner, Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import instance from "../../axiosConfig";

function ViewTest() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(null);

  useEffect(() => {
    async function fetchTest() {
      try {
        const res = await instance.get(`/test/test/${id}`);
        setTest(res.data.test);
      } catch (error) {
        console.error("Failed to fetch test", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTest();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!test) {
    return (
      <Container className="py-5">
        <h3>Test not found</h3>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ marginTop: "100px" }}>
      <h2>{test.title}</h2>
      <p>
        <strong>Number of Questions:</strong> {test.numQuestions}
      </p>
      <p>
        <strong>Duration:</strong> {test.duration} minutes
      </p>
      <p>
        <strong>Released:</strong> {test.released ? "Yes" : "No"}
      </p>

      <h4 className="mt-4">Questions</h4>
      {test.questions && test.questions.length > 0 ? (
        test.questions.map((q, idx) => {
          // Extract question text safely
          const questionText =
            typeof q.question === "object" && q.question !== null
              ? q.question.text || "No question text"
              : q.question || "No question text";

          return (
            <Card key={idx} className="mb-3">
              <Card.Body>
                <Card.Title>
                  Q{idx + 1}: {questionText}
                </Card.Title>

                {/* If question has fileUrl, show link */}
                {typeof q.question === "object" && q.question?.fileUrl && (
                  <a
                    href={q.question.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Question File
                  </a>
                )}

                {q.options && q.options.length > 0 && (
                  <ListGroup variant="flush" className="mt-2">
                    {q.options.map((opt, i) => {
                      const optionText =
                        typeof opt === "object" && opt !== null
                          ? opt.text || "No option text"
                          : opt;

                      return (
                        <ListGroup.Item key={i}>
                          {optionText}

                          {/* Show file link for option if exists */}
                          {typeof opt === "object" && opt?.fileUrl && (
                            <>
                              {" "}
                              -{" "}
                              <a
                                href={opt.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View File
                              </a>
                            </>
                          )}
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <p>No questions found.</p>
      )}
    </Container>
  );
}

export default ViewTest;
