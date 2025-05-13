import adminModel from "../models/adminModel.js";
import studentModel from "../models/studentModel.js";
import authMiddleware from "../middlewares/authJWT.js";
import bcrypt from 'bcrypt'

export async function login(req, res) {
  const { email, password} = req.body;

  console.log(req.body);
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await studentModel.findOne({ email, password});
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
    return res.status(500).json({ message: "Error during login.", error: error.message });
  }
}

export async function changePassword(req, res) {
  const { email, password, newPassword } = req.body;

  try {
    const user = await studentModel.findOne({ email, password:password});

    if (!user) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }
    // console.log(user.password);
    user.password = newPassword;
    user.firstTimesignin=false;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error changing password.", error: error.message });
  }
}

export async function adminLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = authMiddleware(admin._id, "admin");

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 2 * 60 * 60 * 1000, 
    });

    return res.status(200).json({ message: "Admin login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const registerAdmin = async (req, res) => {
  try {
    const {email, password } = req.body;

    let admin = await adminModel.findOne({ email });
    if (admin) return res.status(400).json({ message: "admin already exists" });
    console.log("password"+ password)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed"+hashedPassword);
    admin = new adminModel({email, password: hashedPassword });
    await admin.save();
    res.status(200).json({ message: "admin registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};