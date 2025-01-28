import studentModel from "../models/studentModel.js";

export async function login(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // console.log(email, password)
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const user = await studentModel.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password." });
    }
    return res.status(200).json({ message: "Login successful.", user });
  } catch (error) {
    return res.status(500).json({ message: "Error during login.", error: error.message });
  }
}

export const changePassword = async (req, res) => {
  const { email, password, newPassword } = req.body;

  try {
      const user = await studentModel.findById(email, password);
      console.log(user)
      if (!user || !user.validatePassword(password)) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      user.password = newPassword;
    await user.save();
    console.log(user)

      return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
      return res.status(500).json({ message: "Server error", error });
  }
};
