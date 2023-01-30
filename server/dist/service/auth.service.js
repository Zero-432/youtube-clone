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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginGoogle = exports.login = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const token_1 = require("../utils/token");
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield new user_model_1.default(input);
            return user;
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.createUser = createUser;
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                throw new Error('Unable to find user');
            }
            if (yield user.comparePassword(password)) {
                const objUser = user.toObject();
                const { password } = objUser, others = __rest(objUser, ["password"]);
                others.token = (0, token_1.createToken)(user);
                return {
                    dataUser: others,
                };
            }
            else {
                throw new Error('Wrong credentials given');
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.login = login;
function loginGoogle(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ email: input.email });
            if (user) {
                const objUser = user.toObject();
                objUser.token = (0, token_1.createToken)(user);
                return {
                    dataUser: objUser,
                };
            }
            else {
                const newUser = new user_model_1.default(Object.assign(Object.assign({}, input), { fromGoogle: true }));
                const savedUser = yield newUser.save();
                const objUser = savedUser.toObject();
                objUser.token = (0, token_1.createToken)(savedUser);
                return {
                    dataUser: objUser,
                };
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.loginGoogle = loginGoogle;
