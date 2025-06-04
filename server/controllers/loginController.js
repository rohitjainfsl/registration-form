import adminModel from "../models/adminModel.js";
import studentModel from "../models/studentModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function studentlogin(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await studentModel.findOne({ email, password });
    
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password." });
    }
    
    const token = jwt.sign(
      { id: user._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    res.cookie("studentToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    return res.status(200).json({ message: "Login successful.", user });
  } catch (error) {
    console.error("Login error:", error);
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

    return res.status(200).json({ message: "Password updated successfully.",user });
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

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 2 * 60 * 60 * 1000,
    });

  
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

export const logout = (req, res) => {


  const { adminToken, studentToken } = req.cookies;

  let role = null;

  if (adminToken) {
    role = "admin";
  } else if (studentToken) {
    role = "student";
  } else {
    return res.status(401).json({ message: "No token found, please log in" });
  }

  try {
    res.clearCookie(`${role}Token`, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "LogOut successful" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const checkToken = (req, res)=>{
  const {adminToken, studentToken} = req.cookies;
  let token = null;
  let role = null;
  // console.log(role)
console.log(adminToken,studentToken);

  if(adminToken)
  {
    token = adminToken;
    role = "admin";
  }
  else if(studentToken)
  {
    token = studentToken;
    role = "student";
  }
  else{
    return res.status(401).json({message: "No Token Found, PLEASE LOG IN"});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({
      message:`${role} aunthenticated`,
      role,
      user: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      message:"invalid", error
    })
  }
};
