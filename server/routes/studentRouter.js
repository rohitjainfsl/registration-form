import { Router } from "express";
import { register, fetchStudent, fetchStudentById, updateStudentDetails} from "../controllers/studentController.js";
import { fileArr } from "../middlewares/multer.js";

const studentRouter = Router();

studentRouter.post("/register", fileArr, register);
studentRouter.get("/getStudents", fetchStudent);
studentRouter.get("/getStudents/:id", fetchStudentById)
studentRouter.put('/updateStudent/:id', updateStudentDetails);


export default studentRouter;
