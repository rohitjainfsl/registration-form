import { Router } from "express";
import {   changePassword, adminLogin, checkToken,registerAdmin, logout, studentlogin} from "../controllers/loginController.js";

const loginRouter = Router();

// loginRouter.post("/loginStudents", login);
loginRouter.post("/changePassword",changePassword)
loginRouter.post('/admin', adminLogin)
loginRouter.post('/studentLogin', studentlogin)

loginRouter.get("/checkToken", checkToken)
//loginRouter.get("/getstudents", getData)
loginRouter.post("/registerAdmin", registerAdmin)
loginRouter.post("/logout", logout)

export default loginRouter;
