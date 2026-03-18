import SuccessStory from "../models/successStoryModel.js";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.js";

export const addSuccessStory = async (req, res) => {
  try {
    const { name, caption, rating } = req.body;
    const numericRating = Number(rating);

    if (!name?.trim() || !caption?.trim() || Number.isNaN(numericRating)) {
      return res
        .status(400)
        .json({ message: "Name, caption, rating, and photo are required." });
    }

    if (numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Story image is required." });
    }

    const [uploadResult] = await cloudinaryUpload([req.file]);
    const photoUrl = uploadResult.secure_url;

    const story = await SuccessStory.create({
      name: name.trim(),
      caption: caption.trim(),
      rating: numericRating,
      photo: photoUrl,
    });

    return res.status(201).json({ message: "Success story added", story });
  } catch (error) {
    console.error("addSuccessStory error:", error);
    return res
      .status(500)
      .json({ message: "Failed to add success story", error: error.message });
  }
};

export const getSuccessStories = async (_req, res) => {
  try {
    const stories = await SuccessStory.find().sort({ createdAt: -1 });
    return res.status(200).json({ stories });
  } catch (error) {
    console.error("getSuccessStories error:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch success stories", error: error.message });
  }
};

export const updateSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, caption, rating } = req.body;
    const update = {};
    if (name) update.name = name.trim();
    if (caption) update.caption = caption.trim();
    if (rating) {
      const numeric = Number(rating);
      if (numeric < 1 || numeric > 5 || Number.isNaN(numeric)) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
      }
      update.rating = numeric;
    }
    if (req.file) {
      const [uploadResult] = await cloudinaryUpload([req.file]);
      update.photo = uploadResult.secure_url;
    }

    const story = await SuccessStory.findByIdAndUpdate(id, update, { new: true });
    if (!story) return res.status(404).json({ message: "Story not found" });

    return res.status(200).json({ message: "Success story updated", story });
  } catch (error) {
    console.error("updateSuccessStory error:", error);
    return res
      .status(500)
      .json({ message: "Failed to update success story", error: error.message });
  }
};

export const deleteSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await SuccessStory.findByIdAndDelete(id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    return res.status(200).json({ message: "Success story deleted" });
  } catch (error) {
    console.error("deleteSuccessStory error:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete success story", error: error.message });
  }
};
