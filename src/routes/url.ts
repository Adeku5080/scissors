import  express  from "express";
import { requiresAuth } from 'express-openid-connect';

import {createUrl,redirectUrl} from "../controller/url";

const urlRouter = express.Router()

urlRouter.route('/').get(redirectUrl)
urlRouter.route('/create').post(createUrl)

export default urlRouter