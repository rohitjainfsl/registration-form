// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Container, Button, Spinner, Alert, Row, Col } from "react-bootstrap";
// import instance from "../../axiosConfig";

// function QuizPage() {
//   const { testId } = useParams();
//   const navigate = useNavigate();
//   const [quizAttemptId, setQuizAttemptId] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [responses, setResponses] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [duration, setDuration] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [isQuizFinished, setIsQuizFinished] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [showThankYou, setShowThankYou] = useState(false);

//   useEffect(() => {
//     async function startQuizAndFetchQuestions() {
//       try {
//         const { data: startData } = await instance.post(`/students/start-quiz/${testId}`, {},
//           { withCredentials: true });
//         const quizAttemptId = startData.quizAttemptId;
//         setQuizAttemptId(quizAttemptId);

//         const { data: questionData } = await instance.get(`/students/get-questions/${testId}`);
//         const shuffledQuestions = [...questionData.questions].sort(() => Math.random() - 0.5);
//         setQuestions(shuffledQuestions);
//         setDuration(questionData.duration);
//         setTimeLeft(questionData.duration * 60);
//       } catch (err) {
//         console.error("Error starting quiz or fetching questions:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     startQuizAndFetchQuestions();
//   }, [testId]);

//   useEffect(() => {
//     if (timeLeft <= 0 || isQuizFinished) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleTimeUp();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, isQuizFinished]);

//   const formatTime = (secs) => {
//     const m = Math.floor(secs / 60);
//     const s = secs % 60;
//     return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
//   };

//   const handleSelect = (qid, answerText, optionLetter) => {
//     if (isQuizFinished) return;
//     setResponses((prev) => ({
//       ...prev,
//       [qid]: { selectedAnswer: answerText, selectedOption: optionLetter },
//     }));
//   };

//   const handleSubmitAnswer = async (questionId) => {
//     const response = responses[questionId];
//     if (!response || submitting || isQuizFinished) return;

//     const { selectedAnswer, selectedOption } = response;

//     setSubmitting(true);
//     try {
//       await instance.post(`/students/submit-answer/${quizAttemptId}`, {
//         questionId,
//         selectedAnswer,
//         selectedOption,
//       });

//       setTimeout(() => {
//         if (currentQuestionIndex === questions.length - 1) {
//           handleFinishQuiz();
//         } else {
//           setCurrentQuestionIndex((idx) => idx + 1);
//         }
//         setSubmitting(false);
//       }, 500);
//     } catch (err) {
//       console.error("Submit error:", err);
//       setSubmitting(false);
//     }
//   };

// const calculateScore = (responses) => {
//   let Score = 0;
//   questions.forEach((q) => {
//     const response = responses[q._id];
//     const isCorrect = response && response.selectedOption === q.correct_answer;
//     if (isCorrect) Score++;
//   });
//   return Score;
// };


//   const handleFinishQuiz = async () => {
//     if (isQuizFinished) return;
//     setIsQuizFinished(true);

//     try {
//       const currentQuestion = questions[currentQuestionIndex];
//       const lastResponse = responses[currentQuestion._id];

//       if (lastResponse) {
//         await instance.post(`/students/submit-answer/${quizAttemptId}`, {
//           questionId: currentQuestion._id,
//           selectedAnswer: lastResponse.selectedAnswer,
//           selectedOption: lastResponse.selectedOption,
//         });
//       }

//       const score = calculateScore(responses);
//       const response = await instance.post(`/students/finishQuiz/${quizAttemptId}`, { score });
//       console.log(response);

//       showThankYouMessage();
//     } catch (err) {
//       console.error("Finish error:", err);
//       setIsQuizFinished(false);
//       alert("Error finishing quiz.");
//     }
//   };

//   const handleTimeUp = async () => {
//     if (isQuizFinished) return;
//     setIsQuizFinished(true);
//     try {

//       const score = calculateScore(responses);
//       await instance.post(`/students/finish-quiz/${quizAttemptId}`, { score });
//       showThankYouMessage();
//     } catch (err) {
//       console.error("Time-up submission failed:", err);
//       alert("Error submitting after time expired.");
//     }
//   };


//   const showThankYouMessage = () => {
//     setShowThankYou(true);
//     setTimeout(() => navigate("/student/studentpanel"), 5000);
//   };

//   if (loading) {
//     return (
//       <Container className="text-center my-5">
//         <Spinner animation="border" />
//         <p>Loading quiz...</p>
//       </Container>
//     );
//   }

//   if (showThankYou) {
//     return (
//       <Container className="text-center " style={{ marginTop: "100px" }}>
//         <Alert variant="success" className="fs-4 fw-bold">
//           Thank you for attempting the quiz!
//         </Alert>
//       </Container>
//     );
//   }

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <Container className="py-4" style={{ marginTop: "80px" }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h3>Quiz</h3>
//         <span className={`fw-bold ${timeLeft <= 300 ? "text-danger" : ""}`}>
//           Time Left: {formatTime(timeLeft)}
//         </span>
//       </div>

//       {currentQuestion && (
//         <>
//           <div className="mb-3">
//             <p className="fs-5 fw-semibold">
//               Q{currentQuestionIndex + 1}:{" "}
//               {typeof currentQuestion.question === "object"
//                 ? currentQuestion.question.text || "WHAT WILL BE THE OUTPUT"
//                 : currentQuestion.question || "No question text"}
//             </p>

//             {typeof currentQuestion.question === "object" &&
//               currentQuestion.question.fileUrl && (
//                 <img
//                   src={currentQuestion.question.fileUrl}
//                   alt="Question visual"
//                   className="img-fluid mb-3"
//                 />
//               )}
//           </div>
//           <Row className="mb-3">
//             {currentQuestion.options.map((opt, i) => {
//               const optionText = typeof opt === "object" && opt !== null
//                 ? opt.text || "No option text"
//                 : opt;
//               const optionFile = typeof opt === "object" && opt.fileUrl;

//               return (
//                 <Col xs={12} md={6} className="mb-2" key={i}>
//                   <Button
//                     variant={
//                       responses[currentQuestion._id]?.selectedAnswer === optionText
//                         ? "primary"
//                         : "outline-secondary"
//                     }
//                     className="w-100 text-start"
//                     onClick={() =>
//                       handleSelect(
//                         currentQuestion._id,
//                         optionText,
//                         String.fromCharCode(65 + i)
//                       )
//                     }
//                     disabled={isQuizFinished}
//                   >
//                     {String.fromCharCode(65 + i)}. {optionText}
//                     {optionFile && (
//                       <>
//                         {" - "}
//                         <a
//                           href={opt.fileUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-light text-decoration-underline"
//                         >
//                           View File
//                         </a>
//                       </>
//                     )}
//                   </Button>
//                 </Col>
//               );
//             })}
//           </Row>

//           {currentQuestionIndex === questions.length - 1 &&
//             responses[currentQuestion._id]?.selectedAnswer ? (
//             <Button
//               variant="danger"
//               onClick={handleFinishQuiz}
//               disabled={isQuizFinished || submitting}
//             >
//               {submitting ? "Submitting..." : "Finish Quiz"}
//             </Button>
//           ) : (
//             <Button
//               variant="success"
//               onClick={() => handleSubmitAnswer(currentQuestion._id)}
//               disabled={!responses[currentQuestion._id]?.selectedAnswer || isQuizFinished || submitting}
//             >
//               {submitting ? "Submitting..." : "Submit Answer"}
//             </Button>

//           )}
//         </>
//       )}

//     </Container>
//   );
// }

// export default QuizPage;

import { useEffect } from "react";
import { Container } from "react-bootstrap";
import "../../styles/Loader.css";

function Loader() {
  useEffect(() => {
    const logoContainer = document.querySelector(".logo-container");
    const logoMain = document.querySelector(".logo-main");

    // Mouse parallax
    const handleMouseMove = (e) => {
      const rect = logoContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / 20;
      const deltaY = (e.clientY - centerY) / 20;
      logoContainer.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    };

    const handleMouseLeave = () => {
      logoContainer.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    };

    const handleClickRipple = (e) => {
      const ripple = document.createElement("div");
      const rect = logoContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
        left: ${x - 10}px;
        top: ${y - 10}px;
        pointer-events: none;
        animation: rippleEffect 1s ease-out forwards;
        z-index: 10;
      `;
      logoContainer.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    logoContainer.addEventListener("click", handleClickRipple);

    // Animation sequence
    let sequenceIndex = 0;
    const sequences = ["pulse", "rotate", "bounce", "glow"];

    const interval = setInterval(() => {
      logoMain.style.animation = `${sequences[sequenceIndex]} 2s ease-in-out`;
      sequenceIndex = (sequenceIndex + 1) % sequences.length;
    }, 8000);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      logoContainer.removeEventListener("click", handleClickRipple);
      clearInterval(interval);
    };
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="logo-container">
        <div className="logo-wrapper">
          <div className="logo-part logo-shadow">
            <img
              src="https://res.cloudinary.com/dhawap1lt/image/upload/v1749100806/logo_xsdyvb.png"
              alt="Logo"
              className="logo-image"
              style={{ filter: "blur(8px) brightness(0.3)" }}
            />
          </div>
          <div className="logo-part logo-glow">
            <img
              src="https://res.cloudinary.com/dhawap1lt/image/upload/v1749100806/logo_xsdyvb.png"
              alt="Logo"
              className="logo-image"
              style={{ filter: "blur(20px) brightness(2)" }}
            />
          </div>
          <div className="logo-part logo-reflection">
            <img
              src="https://res.cloudinary.com/dhawap1lt/image/upload/v1749100806/logo_xsdyvb.png"
              alt="Logo"
              className="logo-image"
              style={{ filter: "brightness(0.8) contrast(1.2)" }}
            />
          </div>
          <div className="logo-part logo-main">
            <img
              src="https://res.cloudinary.com/dhawap1lt/image/upload/v1749100806/logo_xsdyvb.png"
              alt="Logo"
              className="logo-image"
            />
          </div>
        </div>

        {/* Particles */}
        {[...Array(6)].map((_, i) => (
          <div className="particle" key={i}></div>
        ))}
      </div>
    </Container>
  );
}

export default Loader;
