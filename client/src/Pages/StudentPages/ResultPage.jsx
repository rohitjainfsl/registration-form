import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { finishQuiz } from "../api/api";

const ResultPage = () => {
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await finishQuiz();
        setScore(res.data.score);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    fetchScore();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl">Quiz Completed!</h2>
      {score !== null ? (
        <p className="text-xl mt-4">Your Score: {score}</p>
      ) : (
        <p>Loading...</p>
      )}
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/student")}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default ResultPage;
