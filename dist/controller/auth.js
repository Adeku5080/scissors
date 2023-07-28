"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dotenv = __importStar(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    //check if a user with the email already exists
    const alreadyExists = yield User_1.default.findOne({ email: req.body.email });
    if (alreadyExists) {
        return res.status(401).json({ msg: 'A user with this email already exists' });
    }
    const user = yield User_1.default.create(userData);
    const tokenUser = {
        name: user.name,
        id: user._id,
    };
    const SECRET_KEY = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign(tokenUser, SECRET_KEY, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
    res.status(201).json({ user: tokenUser });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            msg: 'email and password is required',
        });
    }
    const user = yield User_1.default.findOne({ email: email });
    if (!user) {
        return res.status(401).json({ msg: 'unauthorized' });
    }
    const userPassword = user === null || user === void 0 ? void 0 : user.password;
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, userPassword);
    if (!isPasswordCorrect) {
        return res.status(401).json({ msg: 'Unauthenticated,provide the correct credentials' });
    }
    const tokenUser = {
        name: user.name,
        id: user._id,
    };
    const SECRET_KEY = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign(tokenUser, SECRET_KEY, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
    res.status(200).json({ user: tokenUser });
});
exports.login = login;
