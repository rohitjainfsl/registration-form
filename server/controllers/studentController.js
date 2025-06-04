import studentModel from "../models/studentModel.js";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.js";
import { sendAckEmail, sendDataByEmail } from "../services/acknowledgement.js";

import mongoose from "mongoose";
import Test from "../models/testModel.js";
import QuizAttempt from "../models/QuizAttempt.js";

export async function register(req, res) {
  try {
    let aadharFront,
      aadharBack = undefined;
    const {
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
    } = req.body;

    const cloudinaryObject = await cloudinaryUpload([
      req.files.aadharFront[0],
      req.files.aadharBack[0],
    ]);
    if (cloudinaryObject) {
      aadharFront = cloudinaryObject[0].secure_url;
      aadharBack = cloudinaryObject[1].secure_url;
    }
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
    console.error("MongoDB Save Error: ", error);
    return (
      res
        .status(500)
        // console.error(error);
        .send({ message: "Error registering student ", error: error.message })
    );
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

    // Check for existing quiz attempt
    const existingAttempt = await QuizAttempt.findOne({
      studentId: token.id,
      testId,
    });
    // if (existingAttempt) {
    //   return res.status(400).json({ message: "You have already attempted this quiz." });
    // }

    // ✅ Create a new quiz attempt
    const newAttempt = new QuizAttempt({
      studentId: token.id,
      studentName: user.name,
      testId,
      startTime: new Date(),
    });

    await newAttempt.save();  

    res.status(201).json({
      message: "Quiz attempt started",
      quizAttemptId: newAttempt._id,
    });
  } catch (error) {
    console.error("Error starting quiz:", error);
    res.status(500).json({ message: "Error starting quiz", error: error.message });
  }
}

export async function submitAnswer(req, res) {
  try {
    const { quizAttemptId } = req.params;
    const { questionId, selectedOption, selectedAnswer } = req.body;
console.log(questionId,selectedOption,selectedAnswer  );

    const quizAttempt = await QuizAttempt.findById(quizAttemptId);
    if (!quizAttempt) {
      return res.status(404).json({ message: "Quiz attempt not found" });
    }

    const existingResponse = quizAttempt.responses.find(
      (resp) => resp.questionId.equals(questionId)
    );

    if (existingResponse) {
      existingResponse.selectedOption = selectedOption;
      existingResponse.selectedAnswer = selectedAnswer;
    } else {
      quizAttempt.responses.push({ questionId, selectedOption, selectedAnswer });
    }

    await quizAttempt.save();

    return res.status(200).json({ message: "Answer submitted successfully" });
  } catch (error) {
    console.error("Submit answer error:", error);
    return res.status(500).json({
      message: "Error submitting answer",
      error: error.message,
    });
  }
}

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

export async function finishQuiz(req, res) {
  try {
    const { quizAttemptId } = req.params;
    const { score } = req.body;

    const quizAttempt = await QuizAttempt.findById(quizAttemptId);
    if (!quizAttempt) {
      return res.status(404).json({ message: "Quiz attempt not found" });
    }

    // quizAttempt.endTime = new Date();
    // quizAttempt.score = score;
    quizAttempt.endTime = new Date();
    quizAttempt.score = score;
    await quizAttempt.save();

    res.status(200).json({ message: "Quiz completed", score });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finishing quiz", error: error.message });
  }
};