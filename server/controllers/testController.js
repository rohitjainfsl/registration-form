
import Test from "../models/testModel.js";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.js";

export const createTest = async (req, res) => {
  try {
    const { title, numQuestions, duration } = req.body;
    const questions = JSON.parse(req.body.questions); 


    let questionImages = [];

    if (req.files?.questionimage) {
      questionImages = await cloudinaryUpload(req.files.questionimage); 
    }

    const processedQuestions = questions.map((q, index) => {
      const imageUrl = questionImages[index]?.secure_url || null;0

      return {
        question: {
          text: q.text || null,
          fileUrl: imageUrl,
        },
        options: q.options,
        correct_answer: q.correct_answer,
        codeSnippet: q.codeSnippet || null,
      };
    });
    console.log(processedQuestions);
    

    const newTest = new Test({
      title,
      numQuestions,
      duration,
      questions: processedQuestions,
    });

    await newTest.save();
    res.status(201).json({ message: "Test created successfully", test: newTest });
  } catch (err) {
    console.error("Test creation failed: ", err);
    res.status(500).json({ error: "Test creation failed", details: err.message });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 }); // recent first
    res.status(200).json({ tests });
  } catch (err) {
    console.error("Error fetching tests: ", err);
    res.status(500).json({ message: "Failed to fetch tests", error: err.message });
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
    res.status(500).json({ message: "Failed to fetch test", error: err.message });
  }
};

export const updateTest = async (req, res) => {
  try {
    const testId = req.params.id;
    const { title, numQuestions, duration, questions, options, released } = req.body;

    const updatedTest = await Test.findByIdAndUpdate(
      testId,
      { title, numQuestions, duration, questions, options, released },
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ message: "Test updated successfully", test: updatedTest });
  } catch (err) {
    console.error("Error updating test:", err);
    res.status(500).json({ message: "Failed to update test", error: err.message });
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

export const deleteTest = async (req, res)=> {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);
    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ message: "Failed to delete test", error: error.message });
  }
}

