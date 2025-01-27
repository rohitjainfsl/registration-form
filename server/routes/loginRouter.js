import { Router } from "express";
// import { login } from "../controllers/authController.js";
import { login } from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/login", login);

export default loginRouter;
