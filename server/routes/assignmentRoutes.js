import express from "express";
import {
  createAssignment,
  deleteAssignment,
  getAllAssignments,
  updateAssignment,
} from "../controllers/assignmentController.js";
import authMiddleware from "../middlewares/authJWT.js";

const router = express.Router();

router.post("/", authMiddleware("adminToken"), createAssignment);

router.put("/:id", authMiddleware("adminToken"), updateAssignment);

router.delete("/:id", authMiddleware("adminToken"), deleteAssignment);

router.get("/", authMiddleware("adminToken", "studentToken"), getAllAssignments);

export default router;
