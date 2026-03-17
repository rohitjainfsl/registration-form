import express from "express";
import { createAssignment, getAllAssignments } from "../controllers/assignmentController.js";
import authMiddleware from "../middlewares/authJWT.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware("adminToken"),
  createAssignment,
);

router.get("/", authMiddleware("adminToken", "studentToken"), getAllAssignments);

export default router;
