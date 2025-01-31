import studentModel from "../models/studentModel.js";


export async function login(req, res) {
  const { email, password} = req.body;

  // console.log(firstTimesignin);
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
  const { email, Password, newPassword } = req.body;

  try {
    if (!email || !Password || !newPassword) {
      return res.status(400).json({ message: "Email, old password, and new password are required." });
    }

    const user = await studentModel.findOne({ email, password:Password});

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

