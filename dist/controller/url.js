"use strict";
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
const Url_1 = __importDefault(require("../models/Url"));
const crypto_1 = require("crypto");
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { longUrl } = req.body;
    const hashedUrl = (0, crypto_1.createHash)('md5').update(longUrl).digest('hex');
    const shortenedUrl = hashedUrl.slice(0, 5);
    const url = yield Url_1.default.create({ longUrl: longUrl, shortUrl: shortenedUrl });
    console.log(url, "adeku");
    res.status(201).json({ url });
});
exports.default = createUrl;
