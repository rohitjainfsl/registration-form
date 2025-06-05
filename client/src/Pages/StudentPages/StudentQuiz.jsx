import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Spinner, Alert, Row, Col } from "react-bootstrap";
import instance from "../../axiosConfig";

function QuizPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [quizAttemptId, setQuizAttemptId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  
  // Refs to access latest state in event handlers
  const isQuizFinishedRef = useRef(false);
  const quizAttemptIdRef = useRef(null);
  const responsesRef = useRef({});
  const questionsRef = useRef([]);

  // Update refs when state changes
  useEffect(() => {
    isQuizFinishedRef.current = isQuizFinished;
  }, [isQuizFinished]);

  useEffect(() => {
    quizAttemptIdRef.current = quizAttemptId;
  }, [quizAttemptId]);

  useEffect(() => {
    responsesRef.current = responses;
  }, [responses]);

  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  useEffect(() => {
    async function startQuizAndFetchQuestions() {
      try {
        const { data: startData } = await instance.post(`/students/start-quiz/${testId}`, {},
          { withCredentials: true });
        const quizAttemptId = startData.quizAttemptId;
        setQuizAttemptId(quizAttemptId);

        const { data: questionData } = await instance.get(`/students/get-questions/${testId}`);
        const shuffledQuestions = [...questionData.questions].sort(() => Math.random() - 0.5);
        setQuestions(shuffledQuestions);
        setDuration(questionData.duration);
        setTimeLeft(questionData.duration * 60);
      } catch (err) {
        console.error("Error starting quiz or fetching questions:", err);
      } finally {
        setLoading(false);
      }
    }

    startQuizAndFetchQuestions();
  }, [testId]);

  // Calculate score function that uses refs
  const calculateScoreFromRefs = useCallback(() => {
    let score = 0;
    questionsRef.current.forEach((q) => {
      const response = responsesRef.current[q._id];
      const isCorrect = response && response.selectedOption === q.correct_answer;
      if (isCorrect) score++;
    });
    return score;
  }, []);

  // Silent finish function for auto-finish scenarios
  const finishQuizSilently = useCallback(async () => {
    if (isQuizFinishedRef.current || !quizAttemptIdRef.current) return;
    
    try {
      const score = calculateScoreFromRefs();
      
      // Use navigator.sendBeacon for reliable submission during page unload
      if (navigator.sendBeacon) {
        const data = JSON.stringify({ score });
        const url = `${instance.defaults.baseURL}/students/finishQuiz/${quizAttemptIdRef.current}`;
        navigator.sendBeacon(url, new Blob([data], { type: 'application/json' }));
      } else {
        // Fallback for browsers that don't support sendBeacon
        await fetch(`${instance.defaults.baseURL}/students/finishQuiz/${quizAttemptIdRef.current}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ score }),
          keepalive: true
        });
      }
      
      isQuizFinishedRef.current = true;
    } catch (err) {
      console.error("Silent finish error:", err);
    }
  }, [calculateScoreFromRefs]);

  // Event handlers using useCallback to prevent recreation
  const handleBeforeUnload = useCallback((event) => {
    if (!isQuizFinishedRef.current && quizAttemptIdRef.current) {
      event.preventDefault();
      event.returnValue = 'You have an active quiz. Are you sure you want to leave?';
      finishQuizSilently();
    }
  }, [finishQuizSilently]);

  const handleUnload = useCallback(() => {
    if (!isQuizFinishedRef.current && quizAttemptIdRef.current) {
      finishQuizSilently();
    }
  }, [finishQuizSilently]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden' && !isQuizFinishedRef.current && quizAttemptIdRef.current) {
      finishQuizSilently();
    }
  }, [finishQuizSilently]);

  const handlePopState = useCallback((event) => {
    if (!isQuizFinishedRef.current && quizAttemptIdRef.current) {
      event.preventDefault();
      const confirmLeave = window.confirm('You have an active quiz. Leaving will automatically submit your quiz. Do you want to continue?');
      
      if (confirmLeave) {
        finishQuizSilently();
        // Allow navigation after a brief delay
        setTimeout(() => {
          window.history.back();
        }, 100);
      } else {
        // Push state again to prevent navigation
        window.history.pushState(null, null, window.location.pathname);
      }
    }
  }, [finishQuizSilently]);

  // Setup event listeners
  useEffect(() => {
    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Push state to handle back button
    window.history.pushState(null, null, window.location.pathname);

    // Cleanup function
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleBeforeUnload, handleUnload, handlePopState, handleVisibilityChange]);

  useEffect(() => {
    if (timeLeft <= 0 || isQuizFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isQuizFinished]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelect = (qid, answerText, optionLetter) => {
    if (isQuizFinished) return;
    setResponses((prev) => ({
      ...prev,
      [qid]: { selectedAnswer: answerText, selectedOption: optionLetter },
    }));
  };

  const handleSubmitAnswer = async (questionId) => {
    const response = responses[questionId];
    if (!response || submitting || isQuizFinished) return;

    const { selectedAnswer, selectedOption } = response;

    setSubmitting(true);
    try {
      await instance.post(`/students/submit-answer/${quizAttemptId}`, {
        questionId,
        selectedAnswer,
        selectedOption,
      });

      setTimeout(() => {
        if (currentQuestionIndex === questions.length - 1) {
          handleFinishQuiz();
        } else {
          setCurrentQuestionIndex((idx) => idx + 1);
        }
        setSubmitting(false);
      }, 500);
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitting(false);
    }
  };

  const calculateScore = (responses) => {
    let Score = 0;
    questions.forEach((q) => {
      const response = responses[q._id];
      const isCorrect = response && response.selectedOption === q.correct_answer;
      if (isCorrect) Score++;
    });
    return Score;
  };

  const handleFinishQuiz = async () => {
    if (isQuizFinished) return;
    setIsQuizFinished(true);

    try {
      const currentQuestion = questions[currentQuestionIndex];
      const lastResponse = responses[currentQuestion._id];

      if (lastResponse) {
        await instance.post(`/students/submit-answer/${quizAttemptId}`, {
          questionId: currentQuestion._id,
          selectedAnswer: lastResponse.selectedAnswer,
          selectedOption: lastResponse.selectedOption,
        });
      }

      const score = calculateScore(responses);
      const response = await instance.post(`/students/finishQuiz/${quizAttemptId}`, { score });
      console.log(response);

      showThankYouMessage();
    } catch (err) {
      console.error("Finish error:", err);
      setIsQuizFinished(false);
      alert("Error finishing quiz.");
    }
  };

  const handleTimeUp = async () => {
    if (isQuizFinished) return;
    setIsQuizFinished(true);
    try {
      const score = calculateScore(responses);
      await instance.post(`/students/finish-quiz/${quizAttemptId}`, { score });
      showThankYouMessage();
    } catch (err) {
      console.error("Time-up submission failed:", err);
      alert("Error submitting after time expired.");
    }
  };

  const showThankYouMessage = () => {
    setShowThankYou(true);
    setTimeout(() => navigate("/student/studentpanel"), 5000);
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Loading quiz...</p>
      </Container>
    );
  }

  if (showThankYou) {
    return (
      <Container className="text-center " style={{ marginTop: "100px" }}>
        <Alert variant="success" className="fs-4 fw-bold">
          Thank you for attempting the quiz!
        </Alert>
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Container className="py-4" style={{ marginTop: "80px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quiz</h3>
        <span className={`fw-bold ${timeLeft <= 300 ? "text-danger" : ""}`}>
          Time Left: {formatTime(timeLeft)}
        </span>
      </div>

      {currentQuestion && (
        <>
          <div className="mb-3">
            <p className="fs-5 fw-semibold">
              Q{currentQuestionIndex + 1}:{" "}
              {typeof currentQuestion.question === "object"
                ? currentQuestion.question.text || "WHAT WILL BE THE OUTPUT"
                : currentQuestion.question || "No question text"}
            </p>

            {/* Display question image if available */}
            {typeof currentQuestion.question === "object" &&
              currentQuestion.question.fileUrl && (
                <img
                  src={currentQuestion.question.fileUrl}
                  alt="Question visual"
                  className="img-fluid mb-3"
                />
              )}
          </div>
          <Row className="mb-3">
            {currentQuestion.options.map((opt, i) => {
              const optionText = typeof opt === "object" && opt !== null
                ? opt.text || "No option text"
                : opt;
              const optionFile = typeof opt === "object" && opt.fileUrl;

              return (
                <Col xs={12} md={6} className="mb-2" key={i}>
                  <Button
                    variant={
                      responses[currentQuestion._id]?.selectedAnswer === optionText
                        ? "primary"
                        : "outline-secondary"
                    }
                    className="w-100 text-start"
                    onClick={() =>
                      handleSelect(
                        currentQuestion._id,
                        optionText,
                        String.fromCharCode(65 + i)
                      )
                    }
                    disabled={isQuizFinished}
                  >
                    {String.fromCharCode(65 + i)}. {optionText}
                    {optionFile && (
                      <>
                        {" - "}
                        <a
                          href={opt.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-light text-decoration-underline"
                        >
                          View File
                        </a>
                      </>
                    )}
                  </Button>
                </Col>
              );
            })}
          </Row>

          {currentQuestionIndex === questions.length - 1 &&
            responses[currentQuestion._id]?.selectedAnswer ? (
            <Button
              variant="danger"
              onClick={handleFinishQuiz}
              disabled={isQuizFinished || submitting}
            >
              {submitting ? "Submitting..." : "Finish Quiz"}
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={() => handleSubmitAnswer(currentQuestion._id)}
              disabled={!responses[currentQuestion._id]?.selectedAnswer || isQuizFinished || submitting}
            >
              {submitting ? "Submitting..." : "Submit Answer"}
            </Button>
          )}
        </>
      )}
    </Container>
  );
}

export default QuizPage;