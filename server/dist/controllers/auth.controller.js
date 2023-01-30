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
exports.googleAuth = exports.signin = exports.signup = void 0;
const Logging_1 = __importDefault(require("../library/Logging"));
const auth_service_1 = require("../service/auth.service");
const Error_1 = __importDefault(require("../utils/Error"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, auth_service_1.createUser)(req.body);
        yield newUser.save();
        res.status(200).send('User has been created!');
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { dataUser } = yield (0, auth_service_1.login)(email, password);
        res.status(200).json(dataUser);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.signin = signin;
const googleAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dataUser } = yield (0, auth_service_1.loginGoogle)(req.body);
        res.status(200).json(dataUser);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.googleAuth = googleAuth;
