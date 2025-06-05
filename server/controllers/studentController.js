import studentModel from "../models/studentModel.js";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.js";
import { sendAckEmail, sendDataByEmail } from "../services/acknowledgement.js";
import Test from "../models/testModel.js";
import QuizAttempt from "../models/QuizAttempt.js";

export async function register(req, res) {
  try {

    let aadharFront = "", aadharBack = "";

    const {
      name, email, phone, dob, gender, fname, fphone,
      laddress, paddress, role, qualification,
      qualificationYear, college, designation,
      company, course, otherCourse, referral, friendName
    } = req.body;

    const aadharFiles = req.files.filter(
      (file) => file.fieldname === "aadharFront" || file.fieldname === "aadharBack"
    );

    const cloudinaryObject = await cloudinaryUpload(aadharFiles);

    cloudinaryObject.forEach((uploaded) => {
      if (uploaded.fieldname === "aadharFront") {
        aadharFront = uploaded.secure_url;
      } else if (uploaded.fieldname === "aadharBack") {
        aadharBack = uploaded.secure_url;
      }
    });

    const newRegistration = new studentModel({
      name,
      email,
      phone,
      dob,
      gender,
      fname,
      fphone,
      laddress,
      paddress,
      role,
      qualification,
      qualificationYear,
      college,
      designation,
      company,
      course,
      otherCourse,
      referral,
      friendName,
      aadharFront,
      aadharBack,
    });

    await newRegistration.save();

    sendAckEmail(newRegistration);
    sendDataByEmail(newRegistration);

    return res.status(201).send({ message: "Registration Successful" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).send({
      message: "Error registering student",
      error: error.message,
    });
  }
}

export async function fetchStudent(req, res) {
  try {
    const students = await studentModel
      .find()
      .select('-email_check -password -salt') 
      .sort({ createdAt: -1 });

    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students: ", error);
    return res.status(500).json({
      message: "Failed to fetch student data",
      error: error.message,
    });
  }
}

export async function fetchStudentById(req, res) {
  try {
    const { id } = req.params;

    const student = await studentModel.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({ message: "Server error while fetching student." });
  }
}

export async function updateStudentDetails(req, res) {
  try {
    const { id } = req.params;
    const { fees, startDate, remarks } = req.body;

    const updatedStudent = await studentModel.findByIdAndUpdate(
      id,
      { fees, startDate, remarks },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student updated", student: updatedStudent });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

export async function getQuestion(req, res) {
  const { testId } = req.params;

  try {
    const test = await Test.findById(testId).populate("questions");
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res
      .status(200)
      .json({ questions: test.questions, duration: test.duration });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving questions", error: error.message });
  }
};

export async function startQuiz(req, res) {
  try {
    const token = req.user;
    const { testId } = req.params;

    const user = await studentModel.findById(token.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    const studentId = token.id;
    const newAttempt = {
      testId,
      startTime: new Date(),
      responses: [] // Initialize empty responses array for this attempt
    };

    let quizAttemptDoc = await QuizAttempt.findOne({ studentId });

    if (quizAttemptDoc) {
      const alreadyAttempted = quizAttemptDoc.attempts.some(
        (attempt) => attempt.testId.toString() === testId
      );
      if (alreadyAttempted) {
        return res.status(400).json({ message: "You have already attempted this quiz." });
      }

      quizAttemptDoc.attempts.push(newAttempt);
      await quizAttemptDoc.save();

      const latestAttemptId = quizAttemptDoc.attempts[quizAttemptDoc.attempts.length - 1]._id;

      return res.status(201).json({
        message: "Quiz attempt started",
        quizAttemptId: latestAttemptId,
      });
    } else {
      const newQuizAttemptDoc = new QuizAttempt({
        studentId,
        studentName: user.name,
        collegeId: user.collegeId,
        attempts: [newAttempt],
      });

      await newQuizAttemptDoc.save();

      return res.status(201).json({
        message: "Quiz attempt started",
        quizAttemptId: newQuizAttemptDoc.attempts[0]._id,
      });
    }
  } catch (error) {
    console.error("Error starting quiz:", error);
    res.status(500).json({ message: "Error starting quiz", error: error.message });
  }
}

export async function submitAnswer(req, res) {
  try {
    const { quizAttemptId } = req.params;
    const { questionId, selectedOption, selectedAnswer } = req.body;
    console.log(questionId, selectedOption, selectedAnswer);

    // Find the document containing the attempt
    const quizAttemptDoc = await QuizAttempt.findOne({
      "attempts._id": quizAttemptId,
    });

    if (!quizAttemptDoc) {
      return res.status(404).json({ message: "Quiz attempt not found" });
    }

    // Find the specific attempt
    const attempt = quizAttemptDoc.attempts.id(quizAttemptId);
    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    // Check if response already exists for this question
    const existingResponseIndex = attempt.responses.findIndex(
      (resp) => resp.questionId.equals(questionId)
    );

    if (existingResponseIndex !== -1) {
      // Update existing response
      attempt.responses[existingResponseIndex].selectedOption = selectedOption;
      attempt.responses[existingResponseIndex].selectedAnswer = selectedAnswer;
    } else {
      // Add new response
      attempt.responses.push({ questionId, selectedOption, selectedAnswer });
    }

    await quizAttemptDoc.save();

    return res.status(200).json({ message: "Answer submitted successfully" });
  } catch (error) {
    console.error("Submit answer error:", error);
    return res.status(500).json({
      message: "Error submitting answer",
      error: error.message,
    });
  }
}

export async function finishQuiz(req, res) {
  try {
    const { quizAttemptId } = req.params;
    const { score } = req.body;

    if (typeof score !== "number") {
      return res.status(400).json({ message: "Score must be a number" });
    }

    // Find the document containing the attempt
    const quizAttemptDoc = await QuizAttempt.findOne({
      "attempts._id": quizAttemptId,
    });

    if (!quizAttemptDoc) {
      return res.status(404).json({ message: "Quiz attempt not found" });
    }

    // Find the specific attempt
    const attempt = quizAttemptDoc.attempts.id(quizAttemptId);

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    // Check if quiz is already finished
    if (attempt.endTime) {
      return res.status(400).json({ message: "Quiz already completed" });
    }

    attempt.endTime = new Date();
    attempt.score = score;

    await quizAttemptDoc.save();

    return res.status(200).json({ message: "Quiz completed", attempt });
  } catch (error) {
    console.error("Error finishing quiz:", error);
    return res.status(500).json({ message: "Error finishing quiz", error: error.message });
  }
}