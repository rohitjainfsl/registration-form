import { Router } from "express";
import { login, changePassword, adminLogin, checkToken,registerAdmin, logout} from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/loginStudents", login);
loginRouter.post("/changePassword",changePassword)
loginRouter.post('/admin', adminLogin)
loginRouter.get("/checkToken", checkToken)
// loginRouter.get("/getstudents", getData)
loginRouter.post("/registerAdmin", registerAdmin)
loginRouter.post("/logout", logout)

export default loginRouter;
