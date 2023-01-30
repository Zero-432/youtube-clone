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
exports.getComment = exports.deleteComment = exports.addComment = void 0;
const Logging_1 = __importDefault(require("../library/Logging"));
const comment_service_1 = require("../service/comment.service");
const Error_1 = __importDefault(require("../utils/Error"));
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newComment = yield (0, comment_service_1.add)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.body);
        const savedComment = yield newComment.save();
        res.status(200).json(savedComment);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.addComment = addComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        yield (0, comment_service_1.delComment)(req.params.id, (_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
        res.status(200).json('The comment has been deleted.');
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.deleteComment = deleteComment;
const getComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield (0, comment_service_1.getCmt)(req.params.videoId);
        res.status(200).json(comments);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.getComment = getComment;
