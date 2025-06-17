// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Button,
//   Table,
//   Spinner,
//   Alert
// } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import instance from "../../axiosConfig";

// function ResultPage() {
//   const [quizAttempts, setQuizAttempts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tests, setTests] = useState({}); // Store test details by testId
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchQuizAttempts() {
//       try {
//         setLoading(true);
//         const res = await instance.get(`/student/results`, {
//           withCredentials: true
//         });
//         console.log(res);
        
//         // Flatten all attempts from all quiz attempt documents
//         const allAttempts = [];
//         const testIds = new Set(); // Collect unique test IDs
        
//         if (res.data && Array.isArray(res.data)) {
//           res.data.forEach(quizDoc => {
//             if (quizDoc.attempts && Array.isArray(quizDoc.attempts)) {
//               quizDoc.attempts.forEach(attempt => {
//                 allAttempts.push({
//                   ...attempt,
//                   studentName: quizDoc.studentName,
//                   studentId: quizDoc.studentId,
//                   quizAttemptId: attempt._id,
//                   testId: attempt.testId // Use testId from attempt
//                 });
//                 testIds.add(attempt.testId); // Collect test ID
//               });
//             }
//           });
//         }
        
//         // Sort by most recent first
//         allAttempts.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
//         setQuizAttempts(allAttempts);
        
//         // Fetch test details for all unique test IDs
//         await fetchTestDetails(Array.from(testIds));
        
//       } catch (error) {
//         console.error("Failed to fetch quiz attempts", error);
//         setError("Failed to load quiz results. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     async function fetchTestDetails(testIds) {
//       try {
//         // Fetch test details for all test IDs
//         const testPromises = testIds.map(testId => 
//           instance.get(`/tests/${testId}`, { withCredentials: true })
//             .catch(err => {
//               console.error(`Failed to fetch test ${testId}:`, err);
//               return { data: { _id: testId, title: 'Unknown Test', subject: 'N/A' } };
//             })
//         );
        
//         const testResponses = await Promise.all(testPromises);
//         const testsMap = {};
        
//         testResponses.forEach(response => {
//           if (response.data) {
//             testsMap[response.data._id] = response.data;
//           }
//         });
        
//         setTests(testsMap);
//       } catch (error) {
//         console.error("Failed to fetch test details", error);
//         // Don't set error here as it's not critical - we can still show results without test names
//       }
//     }

//     fetchQuizAttempts();
//   }, []);

//   const handleViewResult = (quizAttemptId, testId) => {
//     navigate(`/student/result-detail/${quizAttemptId}`, { 
//       state: { testId } 
//     });
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString();
//   };

//   const getScoreDisplay = (attempt) => {
//     if (attempt.score !== undefined && attempt.score !== null) {
//       return `${attempt.score}/${attempt.responses?.length || 0}`;
//     }
//     return "Not completed";
//   };

//   const getStatusBadge = (attempt) => {
//     if (attempt.endTime) {
//       return <span className="badge bg-success">Completed</span>;
//     }
//     return <span className="badge bg-warning">In Progress</span>;
//   };

//   const getTestDisplay = (testId) => {
//     const test = tests[testId];
//     if (test) {
//       return (
//         <div>
//           <div className="fw-bold">{test.title || 'Untitled Test'}</div>
//           <small className="text-muted">
//             {test.subject && `Subject: ${test.subject}`}
//             {test.duration && ` | Duration: ${test.duration} min`}
//           </small>
//         </div>
//       );
//     }
//     return (
//       <div>
//         <div className="text-muted">Loading test details...</div>
//         <small className="text-muted">
//           ID: {testId?.toString().slice(-8)}...
//         </small>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <Container className="text-center py-5" style={{ marginTop: "100px" }}>
//         <Spinner animation="border" />
//         <p className="mt-2">Loading your quiz results...</p>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="py-4" style={{ marginTop: "100px" }}>
//         <Alert variant="danger">{error}</Alert>
//         <Button variant="primary" onClick={() => navigate("/student/studentpanel")}>
//           Back to Tests
//         </Button>
//       </Container>
//     );
//   }

//   return (
//     <Container className="py-4" style={{ marginTop: "100px" }}>
//       <div className="d-flex align-items-center justify-content-between mb-3">
//         <h2 className="mb-0">Quiz Results</h2>
//         <Button 
//           variant="secondary" 
//           onClick={() => navigate("/student/studentpanel")}
//         >
//           Back to Tests
//         </Button>
//       </div>

//       {quizAttempts.length === 0 ? (
//         <Alert variant="info">
//           No quiz attempts found. Take a quiz to see your results here.
//         </Alert>
//       ) : (
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Test Details</th>
//               <th>Attempt ID</th>
//               <th>Started At</th>
//               <th>Status</th>
//               <th>Score</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {quizAttempts.map((attempt) => (
//               <tr key={attempt._id}>
//                 <td style={{ minWidth: '200px' }}>
//                   {getTestDisplay(attempt.testId)}
//                 </td>
//                 <td>
//                   <code className="text-muted">
//                     {attempt.quizAttemptId?.slice(-8)}...
//                   </code>
//                 </td>
//                 <td>{formatDate(attempt.startTime)}</td>
//                 <td>{getStatusBadge(attempt)}</td>
//                 <td>
//                   <strong>{getScoreDisplay(attempt)}</strong>
//                 </td>
//                 <td>
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     onClick={() => handleViewResult(attempt.quizAttemptId, attempt.testId)}
//                     disabled={!attempt.endTime}
//                   >
//                     {attempt.endTime ? "View Details" : "In Progress"}
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// }

// export default ResultPage;

import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Spinner, Row, Col, Alert } from "react-bootstrap";

function ResultPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("/api/student/result", {
          withCredentials: true,
        });

        if (res.data && res.data.results) {
          setResults(res.data.results);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Failed to fetch results:", err);
        setError("Failed to fetch results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p>Loading results...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (results.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="info">No test results found for your account.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Your Test Results</h2>
      <Row>
        {results.map((result, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className="shadow h-100">
              <Card.Body>
                <Card.Title>{result.title || "Untitled Test"}</Card.Title>
                <p>
                  <strong>Test ID:</strong> {result.testId}
                </p>
                <p>
                  <strong>Score:</strong> {result.score} /{" "}
                  {result.responses?.length || 0}
                </p>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {new Date(result.startTime).toLocaleString()}
                </p>
                <p>
                  <strong>End Time:</strong>{" "}
                  {new Date(result.endTime).toLocaleString()}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ResultPage;
