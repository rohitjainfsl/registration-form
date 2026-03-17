import express from "express";
import { createAssignment, getAllAssignments } from "../controllers/assignmentController.js";
import authMiddleware from "../middlewares/authJWT.js";

const router = express.Router();

// Admin-only for now. Add "studentToken" when exposing to students later.
router.post(
  "/",
  authMiddleware("adminToken"),
  createAssignment,
);

router.get("/", authMiddleware("adminToken"), getAllAssignments);

export default router;
