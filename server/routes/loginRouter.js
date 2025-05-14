import { Router } from "express";
import { login, changePassword, adminLogin} from "../controllers/loginController.js";

const loginRouter = Router();

loginRouter.post("/login", login);
loginRouter.post("/changePassword",changePassword)
loginRouter.post('/adminLogin', adminLogin)
// loginRouter.post("/registerAdmin", registerAdmin)

export default loginRouter;
