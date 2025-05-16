import studentModel from "../models/studentModel.js";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.js";
import { sendAckEmail, sendDataByEmail } from "../services/acknowledgement.js";
import mongoose from "mongoose";

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
}


