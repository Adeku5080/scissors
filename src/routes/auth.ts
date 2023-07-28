import  express  from "express";
 import {login,register} from "../controller/auth"
const authRouter = express.Router()


authRouter.post("/login", login);
authRouter.post("/register", register);

export default authRouter;