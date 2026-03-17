import PlacedStudent from "../models/placedStudentModel.js";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.js";

export const addPlacedStudent = async (req, res) => {
  try {
    const { name, title, company, city } = req.body;

    if (!name?.trim() || !title?.trim() || !company?.trim() || !city?.trim()) {
      return res
        .status(400)
        .json({ message: "Name, title, company, and city are required." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Photo upload is required." });
    }

    const [uploadResult] = await cloudinaryUpload([req.file]);
    const photoUrl = uploadResult.secure_url;

    const student = await PlacedStudent.create({
      name: name.trim(),
      title: title.trim(),
      company: company.trim(),
      city: city.trim(),
      photo: photoUrl,
    });

    return res.status(201).json({ message: "Student added", student });
  } catch (error) {
    console.error("addPlacedStudent error:", error);
    return res
      .status(500)
      .json({ message: "Failed to add student", error: error.message });
  }
};

export const getPlacedStudents = async (_req, res) => {
  try {
    const students = await PlacedStudent.find().sort({ createdAt: -1 });
    return res.status(200).json({ students });
  } catch (error) {
    console.error("getPlacedStudents error:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch students", error: error.message });
  }
};

export const updatePlacedStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, company, city } = req.body;
    const update = {};

    if (name) update.name = name.trim();
    if (title) update.title = title.trim();
    if (company) update.company = company.trim();
    if (city) update.city = city.trim();
    if (req.file) {
      const [uploadResult] = await cloudinaryUpload([req.file]);
      update.photo = uploadResult.secure_url;
    }

    const student = await PlacedStudent.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ message: "Student updated", student });
  } catch (error) {
    console.error("updatePlacedStudent error:", error);
    return res
      .status(500)
      .json({ message: "Failed to update student", error: error.message });
  }
};

export const deletePlacedStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await PlacedStudent.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    console.error("deletePlacedStudent error:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete student", error: error.message });
  }
};
