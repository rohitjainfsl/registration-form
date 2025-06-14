import Test from "../models/testModel.js";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.js";

export const createTest = async (req, res) => {
  try {
    const { title, numQuestions, duration } = req.body;
    const questions = JSON.parse(req.body.questions);

    const questionImagesMap = {};

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        if (file.fieldname.startsWith("questionimage_")) {
          const index = parseInt(file.fieldname.split("_")[1], 10);
          const [result] = await cloudinaryUpload([file]);
          questionImagesMap[index] = result.secure_url;
        }
      }
    }
    const processedQuestions = questions.map((q, index) => ({
      question: {
        text: q.text || null,
        fileUrl: questionImagesMap[index] || null,
      },
      options: q.options,
      correct_answer: q.correct_answer,
      codeSnippet: q.codeSnippet || null,
    }));

    const test = new Test({
      title,
      numQuestions,
      duration,
      questions: processedQuestions,
    });

    await test.save();

    res.status(201).json({ message: "Test created successfully", test });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ message: "Failed to create test" });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 });
    res.status(200).json({ tests });
  } catch (err) {
    console.error("Error fetching tests: ", err);
    res
      .status(500)
      .json({ message: "Failed to fetch tests", error: err.message });
  }
};

export const getTestById = async (req, res) => {
  try {
    const testId = req.params.id;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ test });
  } catch (err) {
    console.error("Error fetching test: ", err);
    res
      .status(500)
      .json({ message: "Failed to fetch test", error: err.message });
  }
};

export const updateTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const { title, numQuestions, duration, questions, options, released } =
      req.body;

    const updatedTest = await Test.findByIdAndUpdate(
      testId,
      { title, numQuestions, duration, questions, options, released },
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res
      .status(200)
      .json({ message: "Test updated successfully", test: updatedTest });
  } catch (err) {
    console.error("Error updating test:", err);
    res
      .status(500)
      .json({ message: "Failed to update test", error: err.message });
  }
};

export const updateTestReleaseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTest = await Test.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ message: "Test updated", test: updatedTest });
  } catch (error) {
    console.error("Error updating test:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);
    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting test:", error);
    res
      .status(500)
      .json({ message: "Failed to delete test", error: error.message });
  }
};
