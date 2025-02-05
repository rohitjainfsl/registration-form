import express from "express";
import cors from "cors";
import "dotenv/config";
// import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// import path from "path";
import studentRouter from "./routes/studentRouter.js";
import connectToDB from "./connection.js";
import loginRouter from "./routes/loginRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 8081;
const app = express();

// app.use(cors({ origin: process.env.FRONTEND_PATH}));

app.use(
  cors({
    origin: process.env.FRONTEND_PATH,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
console.log(process.env.FRONTEND_PATH);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(join(__dirname, "uploads")));

await connectToDB();

app.listen(PORT, () => console.log("Server started at port " + PORT));

app.use("/api/students", studentRouter);
app.use("/api/loginstudents", loginRouter);
app.use("/api/new", loginRouter);
