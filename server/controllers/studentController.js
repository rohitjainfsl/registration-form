import express from "express";
import mongoose from "mongoose";
import studentModel from "../models/studentModel.js";
import { cloudinaryUpload } from "../middlewares/cloudinaryUpload.js";

export async function register(req, res) {
  // console.log(req.body);
  // console.log(req.files);

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

    // const aadharFront = req.files.aadharFront.path;
    // const aadharBack = req.files.aadharBack.path;

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
    return res.status(201).send({ message: "Registration Successful" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error registering student ", error });
  }
}

export async function fetchStudent(req, res) {}
