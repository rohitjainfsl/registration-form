import sendMailchimpResults from "../services/MailChimp.js";
import Test from "../models/testModel.js";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.js";
import attemptQuiz from "../models/QuizAttempt.js";

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

export const CopyTest = async (req, res) => {
  try {
    const { originalTestId, newTitle, newDuration } = req.body;

    if (!originalTestId || !newTitle || !newDuration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const originalTest = await Test.findById(originalTestId);
    if (!originalTest) {
      return res.status(404).json({ message: "Original test not found" });
    }

    const copiedTest = new Test({
      title: newTitle,
      numQuestions: originalTest.numQuestions,
      duration: newDuration,
      questions: originalTest.questions.map((q) => ({
        question: { ...q.question },
        options: [...q.options],
        correct_answer: q.correct_answer,
        codeSnippet: q.codeSnippet || null,
      })),
    });

    await copiedTest.save();

    res.status(201).json({ message: "Test copied successfully", test: copiedTest });
  } catch (error) {
    console.error("Error copying test:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getTestScores = async (req, res) => {
  const { testId } = req.params;

  try {
    const allAttempts = await attemptQuiz.find({
      "attempts.testId": testId,
    });

    const attemptList = [];

    allAttempts.forEach((studentAttempt) => {
      const { studentId, studentName, attempts } = studentAttempt;

      const testAttempt = attempts.find(
        (a) => a.testId.toString() === testId
      );

      if (testAttempt) {
        attemptList.push({
          studentId,
          studentName,
          score: testAttempt.score,
          startTime: testAttempt.startTime,
          endTime: testAttempt.endTime,
        });
      }
    });

    res.status(200).json({ attempts: attemptList });
  } catch (error) {
    console.error("Error fetching test scores:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const TestScoreDetails = async (req, res) => {
  const { studentId, testId } = req.params;

  try {
    const attemptDoc = await attemptQuiz.findOne({ studentId });

    if (!attemptDoc) {
      return res.status(404).json({ message: "Attempt not found" });
    }
    const matchingAttempt = attemptDoc.attempts.find(
      (a) => a.testId.toString() === testId
    );

    if (!matchingAttempt) {
      return res.status(404).json({ message: "Test attempt not found" });
    }
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    const questionMap = {};
    test.questions.forEach((q) => {
      questionMap[q._id.toString()] = q;
    });

    const responseDetails = matchingAttempt.responses.map((r) => {
      const question = questionMap[r.questionId.toString()];
      return {
        questionText: question?.question?.text || "",
        questionImage: question?.question?.fileUrl || null,
        options: question?.options || [],
        correctAnswer: question?.correct_answer || "",
        selectedOption: r.selectedOption || "",
        selectedAnswer: r.selectedAnswer || "", 
      };
    });

    res.status(200).json({
      studentName: attemptDoc.studentName,
      score: matchingAttempt.score,
      startTime: matchingAttempt.startTime,
      endTime: matchingAttempt.endTime,
      responses: responseDetails,
    });
  } catch (error) {
    console.error("Error fetching score details:", error);
    res.status(500).json({ message: "Failed to fetch score details", error: error.message });
  }
};

export const releaseResultsByMailchimp = async (req, res) => {
  const { testId } = req.params;

  try {
    const attempts = await attemptQuiz.find({ testId });

    if (!attempts.length) {
      return res.status(404).json({ message: "No attempts found for this test." });
    }

    const studentIds = attempts.map((a) => a.studentId);
    const students = await studentModel.find({ _id: { $in: studentIds } });

    await sendMailchimpResults({ students, testId });

    res.status(200).json({ message: "Result emails sent to all students." });
  } catch (error) {
    console.error("Mailchimp send error:", error);
    res.status(500).json({ message: "Error sending result emails." });
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

