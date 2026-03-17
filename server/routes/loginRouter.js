import { Router } from "express";
import {
	changePassword,
	adminLogin,
	checkToken,
	registerAdmin,
	logout,
	studentlogin,
	forgotPassword,
	resetPassword,
} from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/changePassword",changePassword)
loginRouter.post('/admin', adminLogin)
loginRouter.post('/studentLogin', studentlogin)
loginRouter.get("/checkToken", checkToken)
loginRouter.post("/registerAdmin", registerAdmin)
loginRouter.post("/logout", logout)
loginRouter.post('/forgot-password', forgotPassword)
loginRouter.post('/reset-password', resetPassword)


export default loginRouter;
