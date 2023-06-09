"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect = (URI) => {
    mongoose_1.default
        .connect(URI, { autoIndex: false })
        .then(() => console.log('connected to the DB'))
        .catch((err) => console.log(err));
};
exports.default = connect;
