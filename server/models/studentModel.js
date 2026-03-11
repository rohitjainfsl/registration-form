import { Schema, model } from "mongoose";
import { generatePassword } from "../services/passwordGenerator.js";
import bcrypt from "bcrypt";

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
    role: {
      type: String,
      default: "student",
      enum: ["student", "admin", "professional"],
    },
    password: String,
    newPassword: String,
    firstTimesignin: { type: Boolean, default: true },
    fees: String,
    startDate: String,
    remarks: String,
    termsAccepted: { type: Boolean},
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);


studentSchema.pre("save", async function (next) {
  try {
    // Generate password if it doesn't exist
    if (!this.password) {
      this.password = generatePassword();
    }
    
    // Hash password if it's new or modified
    if (this.isNew || this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

const studentModel = model("student", studentSchema);
export default studentModel;
