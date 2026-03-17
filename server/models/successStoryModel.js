import mongoose from "mongoose";

const successStorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    caption: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    photo: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const SuccessStory = mongoose.model("SuccessStory", successStorySchema);

export default SuccessStory;
