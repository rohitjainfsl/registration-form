import { Router } from "express";
import { register, fetchStudent } from "../controllers/studentController.js";
import { fileArr } from "../middlewares/multer.js";

const studentRouter = Router();

studentRouter.post("/register", fileArr, register);
studentRouter.get("/getStudents", fetchStudent);

export default studentRouter;
