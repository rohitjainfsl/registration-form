import { Router } from "express";
import {
  register,
  fetchStudent,
  fetchStudentById,
  updateStudentDetails,
  submitAnswer,
  getQuestion,
  startQuiz, 
  finishQuiz,
  deleteManyStudents,
  getScoresByTest,
  getAllScore,
  StudenAnswer,
  getStudentQuizAttempts,
  getStudentQuizAttemptDetail

} from "../controllers/studentController.js";
import { fileArr } from "../middlewares/multer.js";
import authMiddleware from "../middlewares/authJWT.js";

const studentRouter = Router();

studentRouter.post("/register", fileArr, register);
studentRouter.get("/getStudents", authMiddleware("adminToken"), fetchStudent);
studentRouter.get("/getStudents/:id",authMiddleware("adminToken", "studentToken"),fetchStudentById);
studentRouter.put("/updateStudent/:id", updateStudentDetails);
studentRouter.get("/get-questions/:testId",authMiddleware("studentToken"),getQuestion)
studentRouter.post("/start-quiz/:testId" ,authMiddleware("studentToken"),startQuiz)
studentRouter.post("/finishQuiz/:quizAttemptId", authMiddleware("studentToken"),finishQuiz)
studentRouter.post("/deleteMany",authMiddleware("adminToken"),deleteManyStudents )
studentRouter.post("/submit-answer/:quizAttemptId/:testId",authMiddleware("studentToken"),submitAnswer)
studentRouter.get("/score/test/:testId", getScoresByTest);
studentRouter.get("/score",getAllScore)
studentRouter.get("/admin/test/:testId/student/:studentId/answers",authMiddleware("adminToken", "studentToken"),StudenAnswer)
studentRouter.get('/quiz-attempts', authMiddleware("adminToken", "studentToken"), getStudentQuizAttempts);
studentRouter.get('/quiz-attempt-detail/:quizAttemptId', authMiddleware("adminToken", "studentToken"), getStudentQuizAttemptDetail);


export default studentRouter;