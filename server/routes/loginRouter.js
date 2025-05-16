import { Router } from "express";
import { login, changePassword, adminLogin, getToken, getData, registerAdmin, logout} from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/login", login);
loginRouter.post("/changePassword",changePassword)
loginRouter.post('/adminLogin', adminLogin)
loginRouter.get("/checkToken", getToken)
loginRouter.get("/getstudents", getData)
loginRouter.post("/registerAdmin", registerAdmin)
loginRouter.post("/logout", logout)

export default loginRouter;
