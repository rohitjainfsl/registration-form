import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true, maxlength: 60 },
    slug: { type: String, required: true, trim: true, unique: true, lowercase: true },
  },
  { timestamps: true },
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
