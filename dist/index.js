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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_openid_connect_1 = require("express-openid-connect");
const auth0_1 = __importDefault(require("./auth/auth0"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const connect_1 = __importDefault(require("./database/connect"));
// import bodyParser, { urlencoded } from "body-parser";
const url_1 = __importDefault(require("./routes/url"));
const app = (0, express_1.default)();
dotenv.config();
(0, connect_1.default)(process.env.MONGO_URI);
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express_1.default.json());
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(auth0_1.default);
app.get('/', (req, res) => {
    console.log(req.oidc.user, "ali");
    res.render('index', {
        user: req.oidc.user
    });
});
app.get('/profile', (0, express_openid_connect_1.requiresAuth)(), (req, res) => {
    console.log(req.oidc.user);
    res.render('profile', {
        user: req.oidc.user
    });
});
app.get('/callback', (req, res) => {
    console.log(req.oidc.user);
});
app.use("/api/v1/url", url_1.default);
app.listen(5000, () => {
    console.log("server running");
});
