import adminModel from "../models/adminModel.js";
import studentModel from "../models/studentModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function login(req, res) {
  const { email, password } = req.body;

  console.log(req.body);
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await studentModel.findOne({ email, password });
    // console.log(user)
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password." });
    }

    // user.firstTimesignin === "true";

    // if (firstTime) {
    //   user.firstTimesignin = "false";
    //   await user.save();
    // }
    // console.log(user);
    return res.status(200).json({ message: "Login successful.", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error during login.", error: error.message });
  }
}

export async function changePassword(req, res) {
  const { email, password, newPassword } = req.body;

  try {
    const user = await studentModel.findOne({ email, password: password });

    if (!user) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }
    user.password = newPassword;
    user.firstTimesignin = false;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error changing password.", error: error.message });
  }
}

// login

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res
        .status(404)
        .json({ message: "User not found! Please register first." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2 * 60 * 60 * 1000,
    });
    console.log("user login successfully" + token);
    res.status(200).json({ message: "User login successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new adminModel({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(200).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getToken = (req, res) => {
  try {
    const token = req.cookies;
    if (!token || Object.keys(token).length === 0) {
      return res.status(401).json({ message: "No token found" });
    }
    res.status(200).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve token", error: error.message });
  }
};

export const getData = (req, res) => {};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
