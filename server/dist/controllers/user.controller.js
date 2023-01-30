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
exports.dislike = exports.like = exports.unsubscribe = exports.subscribe = exports.getUserHandler = exports.deleteUserHandler = exports.update = void 0;
const Logging_1 = __importDefault(require("../library/Logging"));
const Error_1 = __importDefault(require("../utils/Error"));
const user_service_1 = require("../service/user.service");
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.params.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
        try {
            const updatedUser = yield (0, user_service_1.updateUser)(req.user.id, req.body);
            res.status(200).json(updatedUser);
        }
        catch (err) {
            Logging_1.default.error(err);
            (0, Error_1.default)(err, res);
        }
    }
    else {
        return next((0, Error_1.default)({ status: 403, message: 'You can update only your account!' }, res));
    }
});
exports.update = update;
const deleteUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (req.params.id === ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id)) {
        try {
            yield (0, user_service_1.deleteUser)(req.user.id);
            res.status(200).json('User has been deleted.');
        }
        catch (err) {
            Logging_1.default.error(err);
            (0, Error_1.default)(err, res);
        }
    }
    else {
        return next((0, Error_1.default)({ status: 403, message: 'You can delete only your account!' }, res));
    }
});
exports.deleteUserHandler = deleteUserHandler;
const getUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.getUser)(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.getUserHandler = getUserHandler;
const subscribe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const subscribeObj = yield (0, user_service_1.subscribeUser)((_c = req.user) === null || _c === void 0 ? void 0 : _c.id, req.params.id);
        yield subscribeObj.subscribeUser;
        yield subscribeObj.subscriber;
        res.status(200).json('Subscription Successful!');
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.subscribe = subscribe;
const unsubscribe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const unsubscribeObj = yield (0, user_service_1.unsubscribeUser)((_d = req.user) === null || _d === void 0 ? void 0 : _d.id, req.params.id);
        yield unsubscribeObj.subscribeUser;
        yield unsubscribeObj.subscriber;
        res.status(200).json('Unsubscription Successful!');
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.unsubscribe = unsubscribe;
const like = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        yield (0, user_service_1.likeVideo)((_e = req.user) === null || _e === void 0 ? void 0 : _e.id, req.params.videoId);
        res.status(200).json('The video has been liked.');
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.like = like;
const dislike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        yield (0, user_service_1.dislikeVideo)((_f = req.user) === null || _f === void 0 ? void 0 : _f.id, req.params.videoId);
        res.status(200).json('The video has been disliked.');
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.dislike = dislike;
