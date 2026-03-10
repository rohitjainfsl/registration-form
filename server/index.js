import express from "express";
import cors from "cors";
import "dotenv/config";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import studentRouter from "./routes/studentRouter.js";
import connectToDB from "./connection.js";
import loginRouter from "./routes/loginRouter.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 8081;
const app = express();

// app.use(cors({ origin: process.env.FRONTEND_PATH}));
app.use(cookieParser());

const allowedOrigins = [
  process.env.FRONTEND_PATH,
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'https://registration-form-17dw.onrender.com',
  'https://registration-form-1-mbw5.onrender.com',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);
console.log('Allowed CORS origins:', allowedOrigins);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/static", express.static(join(__dirname, "uploads")));

await connectToDB();

app.listen(PORT, () => console.log("Server started at port " + PORT));

app.use("/api/students", studentRouter);
app.use("/api/auth", loginRouter);
app.use("/api/test", adminRoutes);
