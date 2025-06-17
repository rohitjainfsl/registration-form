import studentModel from "../models/studentModel.js";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.js";
import { sendAckEmail, sendDataByEmail } from "../services/acknowledgement.js";
import Test from "../models/testModel.js";
import attemptQuiz from "../models/QuizAttempt.js";
import mongoose from "mongoose";



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
      firstTimeSignin: true,
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
    // console.log(req);
    
    const token = req.firstTimeSignin.id;
    const { testId } = req.params;
// console.log();

    // console.log(req.user)

    const user = await studentModel.findById(token);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    const studentId = token;
    const newAttempt = {
      testId,
      startTime: new Date(),
      responses: []
    };

    let quizAttemptDoc = await attemptQuiz.findOne({ studentId });

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
      const newQuizAttemptDoc = new attemptQuiz({
        studentId,
        studentName: user.name,
        // collegeId: user.collegeId,
        attempts: [newAttempt],
      });

      await newQuizAttemptDoc.save();
// console.log(newQuizAttemptDoc);
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
    const { quizAttemptId, testId } = req.params;
    console.log(req.params);
    
    const { questionId, selectedOption, selectedAnswer } = req.body;
// console.log(testId);
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ message: "Test not found" });

    const question = test.questions.find(q =>
      q._id.toString() === questionId.toString()
    );

    if (!question) return res.status(404).json({ message: "Question not found" });

    const correctAnswer = question.correct_answer;
    // console.log(correctAnswer);
    

    // Find quiz attempt document
    const quizAttemptDoc = await attemptQuiz.findOne({
      "attempts._id": quizAttemptId,
    });

    if (!quizAttemptDoc)
      return res.status(404).json({ message: "Quiz attempt not found" });

    // Locate the specific attempt
    const attempt = quizAttemptDoc.attempts.id(quizAttemptId);
    if (!attempt)
      return res.status(404).json({ message: "Attempt not found" });

    // Check if response already exists
    const existingResponseIndex = attempt.responses.findIndex(
      (resp) => resp.questionId.toString() === questionId.toString()
    );

    if (existingResponseIndex !== -1) {
      // Update existing response
      attempt.responses[existingResponseIndex].selectedOption = selectedOption;
      attempt.responses[existingResponseIndex].selectedAnswer = selectedAnswer;
      attempt.responses[existingResponseIndex].correct_answer = correctAnswer;
    } else {
      // Add new response with correct answer
      attempt.responses.push({
        questionId,
        selectedOption,
        selectedAnswer,
        correct_answer: correctAnswer,
      });
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
    console.log(quizAttemptId);
    
    const { score } = req.body;
console.log(score);

    if (typeof score !== "number") {
      return res.status(400).json({ message: "Score must be a number" });
    }

    // Find the document containing the attempt
    const quizAttemptDoc = await attemptQuiz.findOne({
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


export async function deleteManyStudents(req, res) {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "No student IDs provided for deletion." });
  }

  try {
    const result = await studentModel.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      message: `${result.deletedCount} student(s) deleted successfully.`,
    });
  } catch (err) {
    console.error("Error deleting students:", err);
    return res.status(500).json({ message: "Failed to delete students", error: err.message });
  }
}


export async function getAllScore(req, res) {
  try {
    const students = await attemptQuiz.find()
    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students: ", error);
    return res.status(500).json({
      message: "Failed to fetch student data",
      error: error.message,
    });
  }
}
export async function getScoresByTest(req, res) {
  try {
    const { testId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(400).json({ message: "Invalid Test ID format!" });
    }

    // Fixed aggregation pipeline
    const students = await attemptQuiz.aggregate([
      {
        $match: {
          "attempts.testId": new mongoose.Types.ObjectId(testId)
        }
      },
      {
        $unwind: "$attempts"
      },
      {
        $match: {
          "attempts.testId": new mongoose.Types.ObjectId(testId)
        }
      },
      {
        $project: {
          _id: 0,
          studentId: "$studentId",
          studentName: "$studentName",
          collegeId: "$collegeId",
          score: "$attempts.score",
          startTime: "$attempts.startTime",
          endTime: "$attempts.endTime",
          testId: "$attempts.testId"
        }
      },
      {
        $sort: { score: -1 } // Sort by score descending, adjust as needed
      }
    ]);
    
    
    if (students.length === 0) {
      return res.status(404).json({ message: "No students found for this test!" });
    }
    
    
    // console.log(`Found ${students.length} students for test ${testId}`);
    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching test scores:", error);
    return res.status(500).json({
      message: "Failed to fetch scores for the test",
      error: error.message,
    });
  }
}


export async function StudenAnswer(req, res) {
  try {
    const { testId, studentId } = req.params;

    // Step 1: Find student's quiz attempt
    const studentAttemptDoc = await attemptQuiz.findOne({ studentId });
    if (!studentAttemptDoc)
      return res.status(404).json({ error: "Student not found" });

    // Step 2: Find the specific test attempt
    const testAttempt = studentAttemptDoc.attempts.find(
      (a) => a.testId.toString() === testId
    );
    if (!testAttempt)
      return res.status(404).json({ error: "Test attempt not found" });

    // Step 3: Fetch questions used in the test
    const questionIds = testAttempt.responses.map((r) => r.questionId);
    const questions = await attemptQuiz.find({ _id: { $in: questionIds } }).lean();

    // Step 4: Get test title
    const test = await Test.findById(testId).lean();

    // Step 5: Build answer report
    const answers = testAttempt.responses.map((response) => {
      const question = questions.find(
        (q) => attemptQuiz._id.toString() === response.testid.toString()
      );
      console.log(question);
      
      return {
        question: {
          text: question?.text || "Question not found",
          options: question?.options || [],
        },
        selectedOption: response.selectedOption,  
        selectedAnswer: response.selectedAnswer,
        correctAnswer: question?.correctOption || "Not available"
      };
    });

    // Step 6: Send response
    return res.json({
      student: {
        id: studentId,
        name: studentAttemptDoc.studentName,
      },
      test: {
        id: testId,
        title: test?.title || "Untitled Test",
      },
      answers,
    });

  } catch (err) {
    console.error("Error fetching student answers:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
