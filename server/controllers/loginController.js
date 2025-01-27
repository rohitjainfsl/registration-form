import studentModel from "../models/studentModel.js";
// import authModel from "../models/loginModel";
// import studentModel from "../models/loginModel.js";

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find user by email
    const user = await studentModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare passwords
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Successful login
    return res.status(200).json({ message: "Login successful.", user });
  } catch (error) {
    return res.status(500).json({ message: "Error during login.", error: error.message });
  }
}
