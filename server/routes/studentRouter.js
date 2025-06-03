import { Router } from "express";
import {
  register,
  fetchStudent,
  fetchStudentById,
  updateStudentDetails,
  submitAnswer,
  getQuestion,
  startQuiz, 
  finishQuiz
} from "../controllers/studentController.js";
import { fileArr } from "../middlewares/multer.js";
import authMiddleware from "../middlewares/authJWT.js";

const studentRouter = Router();

studentRouter.post("/register", fileArr, register);
studentRouter.get("/getStudents", authMiddleware("adminToken"), fetchStudent);
studentRouter.get(
  "/getStudents/:id",
  authMiddleware("adminToken", "studentToken"),
  fetchStudentById
);
studentRouter.put("/updateStudent/:id", updateStudentDetails);

studentRouter.get("/get-questions/:testId",authMiddleware("studentToken"),getQuestion)
studentRouter.post("/start-quiz/:testId" ,authMiddleware("studentToken"),startQuiz)
studentRouter.post("/finish-quiz/:quizAttemptId", authMiddleware("studentToken"),finishQuiz)
studentRouter.post("/submit-answer/:quizAttemptId",
  authMiddleware("studentToken"),submitAnswer)

export default studentRouter;
