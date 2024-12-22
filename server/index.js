import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";
import studentRouter from "./routes/studentRouter.js";
import connectToDB from "./connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extension = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + extension);
//   },
// });

const PORT = 5000;
const app = express();

app.use(cors({ origin: process.env.FRONTEND_PATH }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(join(__dirname, "uploads")));

await connectToDB();

app.listen(PORT, () => console.log("Server started at port " + PORT));

app.use("/api/students", studentRouter);
