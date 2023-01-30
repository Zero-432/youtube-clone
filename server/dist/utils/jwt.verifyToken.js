"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Error_1 = __importDefault(require("./Error"));
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    const tokenConvert = token === null || token === void 0 ? void 0 : token.replace('Bearer ', '');
    if (!tokenConvert)
        return next((0, Error_1.default)({ status: 401, message: 'You are not authenticated!' }, res));
    jsonwebtoken_1.default.verify(tokenConvert, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return next((0, Error_1.default)({ status: 403, message: 'Token is not valid!' }, res));
        req.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
