import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (...tokenKeys) => (req, res, next) => {
  for (const tokenKey of tokenKeys) {
    let token;

    if (tokenKey === "adminToken") token = req.cookies.adminToken;
    else if (tokenKey === "studentToken") token = req.cookies.studentToken;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next(); 
      } catch (error) {
        continue;
      }
    }
  }

  return res.status(401).json({ message: "Unauthorized, please log in" });
};

export default authMiddleware;
