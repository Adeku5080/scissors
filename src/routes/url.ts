import  express  from "express";
import createUrl from "../controller/url";

const urlRouter = express.Router()


urlRouter.route('/').post(createUrl)

export default urlRouter