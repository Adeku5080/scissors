import  express  from "express";

import {createUrl,redirectUrl} from "../controller/url";

const urlRouter = express.Router()

urlRouter.route('/:shorturl').get(redirectUrl)
urlRouter.route('/create').post(createUrl)

export default urlRouter