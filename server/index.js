import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});
const upload = multer({ storage: storage });
const fileArr = upload.fields([
  { name: "aadharFront", maxCount: 1 },
  { name: "aadharBack", maxCount: 1 },
]);

const PORT = 5000;
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
try {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.4ont6qs.mongodb.net/fsl?retryWrites=true&w=majority`
  );
} catch (error) {
  console.log(error);
}
app.listen(PORT, () => console.log("Server started at port " + PORT));

app.post("/register", fileArr, (req, res) => {
  console.log(req.body);
  console.log(req.files);
});
