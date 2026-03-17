import Assignment from "../models/assignmentModel.js";

export const createAssignment = async (req, res) => {
  try {
    const { title, videoLink } = req.body;

    if (!title?.trim() || !videoLink?.trim()) {
      return res.status(400).json({ message: "Title and video link are required." });
    }

    const assignment = await Assignment.create({
      title: title.trim(),
      videoLink: videoLink.trim(),
    });

    return res
      .status(201)
      .json({ message: "Assignment created successfully", assignment });
  } catch (error) {
    console.error("createAssignment error:", error);
    return res
      .status(500)
      .json({ message: "Failed to create assignment", error: error.message });
  }
};

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    return res.status(200).json({ assignments });
  } catch (error) {
    console.error("getAllAssignments error:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch assignments", error: error.message });
  }
};
