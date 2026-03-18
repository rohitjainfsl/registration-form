import Category from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: "Name is required" });
    const slug = slugify(name, { lower: true, strict: true });
    const category = await Category.create({ name: name.trim(), slug });
    return res.status(201).json({ message: "Category created", category });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create category", error: error.message });
  }
};

export const getCategories = async (_req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const category = await Category.findByIdAndUpdate(
      id,
      { name: name.trim(), slug },
      { new: true },
    );
    if (!category) return res.status(404).json({ message: "Category not found" });
    return res.status(200).json({ message: "Category updated", category });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update category", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    return res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete category", error: error.message });
  }
};
