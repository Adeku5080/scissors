"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_1 = require("../controller/url");
const urlRouter = express_1.default.Router();
urlRouter.route('/').get(url_1.redirectUrl);
urlRouter.route('/create').post(url_1.createUrl);
exports.default = urlRouter;
