import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_PATH + "/api",
  withCredentials: true, 
});
export default instance;


 export const getQuizQuestions = async (testId) => {
  console.log(testId);
  
  return instance.get(`/student/get-questions/${testId}`);
};

export const finishQuiz = async (quizAttemptId, data) => {
  return instance.post(`/student/finish-quiz/${quizAttemptId}`, data);
};

export const submitAnswer = async (quizAttemptId, data) => {
  return instance.post(`/student/submit-answer/${quizAttemptId}`, data);
};