import { Schema, model } from "mongoose";

const careerApplicationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    resumeUrl: {
      type: Buffer,
      required: true,
    },
    resumeOriginalName: {
      type: String,
      required: true,
      trim: true,
    },
    resumeMimeType: {
      type: String,
      required: true,
      trim: true,
    },
    resumeSize: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const careerApplicationModel = model("careerApplication", careerApplicationSchema);

export default careerApplicationModel;
