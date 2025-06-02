import { Router } from "express";
import {
  register,
  fetchStudent,
  fetchStudentById,
  updateStudentDetails,
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

export default studentRouter;
