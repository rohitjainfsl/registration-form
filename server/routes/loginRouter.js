import { Router } from "express";
import { login, changePassword, adminLogin, getToken, getData} from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/login", login);
loginRouter.post("/changePassword",changePassword)
loginRouter.post('/adminLogin', adminLogin)
loginRouter.get("/getToken", getToken)
loginRouter.get("/getstudents", getData)
// loginRouter.post("/registerAdmin", registerAdmin)

export default loginRouter;
