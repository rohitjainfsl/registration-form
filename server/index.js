import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
app.use("/static", express.static(join(__dirname, "uploads")));

try {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.4ont6qs.mongodb.net/fsl?retryWrites=true&w=majority`
  );
} catch (error) {
  console.log(error);
}
app.listen(PORT, () => console.log("Server started at port " + PORT));

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dob: String,
  gender: String,
  aadharFront: String,
  aadharBack: String,
  college: String,
  company: String,
  course: String,
  designation: String,
  fname: String,
  fphone: String,
  friendName: String,
  gender: String,
  laddress: String,
  paddress: String,
  otherCourse: String,
  qualification: String,
  qualificationYear: String,
  referral: String,
  role: String,
});
const studentModel = mongoose.model("student", studentSchema);

app.post("/register", fileArr, async (req, res) => {
  // console.log(req.body);
  // console.log(req.files);

  try {
    const {
      name,
      email,
      phone,
      dob,
      gender,
      fname,
      fphone,
      laddress,
      paddress,
      role,
      qualification,
      qualificationYear,
      college,
      designation,
      company,
      course,
      otherCourse,
      referral,
      friendName,
    } = req.body;

    const aadharFront = req.files.aadharFront.path;
    const aadharBack = req.files.aadharBack.path;

    const newRegistration = new studentModel({
      name,
      email,
      phone,
      dob,
      gender,
      fname,
      fphone,
      laddress,
      paddress,
      role,
      qualification,
      qualificationYear,
      college,
      designation,
      company,
      course,
      otherCourse,
      referral,
      friendName,
      aadharFront,
      aadharBack,
    });
    await newRegistration.save();
    return res.status(201).send({ message: "Registration Successful" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error registering student ", error });
  }
});

app.get("/student/:id", (req, res) => {
  const idToFetch = req.params.id;
});
