import { Schema, model } from "mongoose";
import { generatePassword } from "../services/passwordGenerator.js";

const studentSchema = new Schema(
  {
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
    laddress: String,
    paddress: String,
    otherCourse: String,
    qualification: String,
    qualificationYear: String,
    referral: String,
    role: String,
    password: String,
    newPassword: String,
    firstTimesignin: { type: Boolean, default: true },
    fees: String,
    startDate: String,
    remarks: String,
    // password:String,
  },
  { timestamps: true }
);


studentSchema.pre("save", function (next) {
  if (!this.password) {
    this.password = generatePassword();
  }
  next();
});

const studentModel = model("student", studentSchema);
export default studentModel;
