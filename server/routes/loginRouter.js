import { Router } from "express";
// import { login } from "../controllers/authController.js";
import { login, changePassword } from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/login", login);
loginRouter.post("/changePassword",changePassword)

export default loginRouter;
