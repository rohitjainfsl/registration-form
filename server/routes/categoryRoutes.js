import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authJWT.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", authMiddleware("adminToken"), createCategory);
router.put("/:id", authMiddleware("adminToken"), updateCategory);
router.delete("/:id", authMiddleware("adminToken"), deleteCategory);

export default router;
