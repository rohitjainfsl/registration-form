import { useEffect, useState, useRef } from "react";
import {
  Table,
  Container,
  Button,
  Spinner,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";

function ScoreList() {
  const [scores, setScores] = useState([]);
  const [tests, setTests] = useState({});
  const [groupedScores, setGroupedScores] = useState({});
  const [filteredScores, setFilteredScores] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const loadMoreRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScoresAndTests = async () => {
      try {
        const scoresRes = await instance.get("/students/score", { withCredentials: true });
        setScores(scoresRes.data);

        const uniqueTestIds = [...new Set(scoresRes.data.map(score => score.testId).filter(Boolean))];
        
        const testsLookup = {};
        await Promise.all(
          uniqueTestIds.map(async (testId) => {
            try {
              const testRes = await instance.get(`/test/test/${testId}`, { withCredentials: true });
              const test = testRes.data.test;
              testsLookup[testId] = test; 
            } catch (err) {
              console.error(`Error fetching test ${testId}:`, err);
              testsLookup[testId] = { title: `Test ${testId}` };
            }
          })
        );

        setTests(testsLookup);

        const grouped = {};
        scoresRes.data.forEach((score) => {
          const testId = score.testId;
          const testTitle = testsLookup[testId]?.title || `Test ${testId}`;

          if (!grouped[testTitle]) {
            grouped[testTitle] = [];
          }
          grouped[testTitle].push(score);
        });

        setGroupedScores(grouped);
        setFilteredScores(grouped);
        setLoading(false);

      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchScoresAndTests();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      const filtered = {};
      Object.keys(groupedScores).forEach((testName) => {
        const studentsInTest = groupedScores[testName];
        const hasMatchingStudent = studentsInTest.some(score =>
          (score.studentName || '').toLowerCase().includes(search.toLowerCase())
        );

        if (testName.toLowerCase().includes(search.toLowerCase()) || hasMatchingStudent) {
          filtered[testName] = studentsInTest;
        }
      });
      setFilteredScores(filtered);
      setVisibleCount(5);
    } else {
      setFilteredScores(groupedScores);
    }
  }, [search, groupedScores]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const totalTests = Object.keys(filteredScores).length;
      if (entries[0].isIntersecting && visibleCount < totalTests) {
        setVisibleCount((prev) => prev + 5);
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [visibleCount, filteredScores]);

  useEffect(() => {
    const savedY = sessionStorage.getItem("scrollY");
    if (savedY) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedY));
        sessionStorage.removeItem("scrollY");
      }, 0);
    }
  }, []);

  const testNames = Object.keys(filteredScores);
  const testsToDisplay = testNames.slice(0, visibleCount);
  const hasMoreToLoad = visibleCount < testNames.length;

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading quiz attempts...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ marginTop: "100px" }}>
      <h3 className="mb-3">Quiz Attempts by Test</h3>

      <Form className="mb-4">
        <InputGroup>
          <Form.Control
            placeholder="Search by test name or student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Button variant="outline-secondary" onClick={() => setSearch("")}>
              Clear
            </Button>
          )}
        </InputGroup>
      </Form>
      <div>
        {testsToDisplay.length > 0 ? (
          testsToDisplay.map((title) => {
            const studentsForTest = filteredScores[title];
            if (!Array.isArray(studentsForTest)) return null;
            return (
              <div key={title} className="mb-5">
                <h4 className="bg-primary text-white p-3 rounded">
                  {title}
                  <span className="badge bg-light text-dark ms-2">
                    {studentsForTest.length} students attempted
                  </span>
                </h4>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student Name</th>
                      <th>Score</th>
                      <th>Start Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsForTest.map((score, index) => (
                      <tr key={score._id}>
                        <td>{index + 1}</td>
                        <td><strong>{score.studentName || 'N/A'}</strong></td>
                        <td>
                          <span className="badge bg-success">
                            {score.score || 0} points
                          </span>
                        </td>
                        <td>
                          {score.startTime ?
                            new Date(score.startTime).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'N/A'}
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              sessionStorage.setItem("scrollY", window.scrollY);
                              navigate(`/getScore/${score.studentId}`);
                            }}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <h2>No Quiz Attempts Found...</h2>
            <p>No students have attempted any quizzes yet.</p>
          </div>
        )}
      </div>
      {hasMoreToLoad && (
        <div ref={loadMoreRef} className="text-center my-3">
          <Spinner animation="border" size="sm" />
          <span className="ms-2">Loading more tests...</span>
        </div>
      )}
    </Container>
  );
}

export default ScoreList;
