import express from "express";
import {
  addSuccessStory,
  deleteSuccessStory,
  getSuccessStories,
  updateSuccessStory,
} from "../controllers/successStoryController.js";
import authMiddleware from "../middlewares/authJWT.js";
import { successStoryUpload } from "../middlewares/successStoryUpload.js";

const router = express.Router();

router.get("/", getSuccessStories);

router.post(
  "/",
  authMiddleware("adminToken"),
  successStoryUpload.single("photo"),
  addSuccessStory,
);

router.put(
  "/:id",
  authMiddleware("adminToken"),
  successStoryUpload.single("photo"),
  updateSuccessStory,
);

router.delete("/:id", authMiddleware("adminToken"), deleteSuccessStory);

export default router;
