"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const createUrl = (req, res) => {
    const { longUrl } = req.body;
    const hashedurl = (0, crypto_1.createHash)('md5').update(longUrl).digest('hex');
    console.log(hashedurl);
    // const url = UrlModel.create(req.body)
};
exports.default = createUrl;
