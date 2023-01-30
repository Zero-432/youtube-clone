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
exports.getCmt = exports.delComment = exports.add = void 0;
const comment_model_1 = __importDefault(require("../models/comment.model"));
const video_model_1 = __importDefault(require("../models/video.model"));
function add(idUser, input) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new comment_model_1.default(Object.assign(Object.assign({}, input), { userId: idUser }));
    });
}
exports.add = add;
function delComment(idComment, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield comment_model_1.default.findById(idComment);
        const video = yield video_model_1.default.findById(comment === null || comment === void 0 ? void 0 : comment.videoId);
        if (idUser === (comment === null || comment === void 0 ? void 0 : comment.userId) || idUser === (video === null || video === void 0 ? void 0 : video.userId)) {
            return comment_model_1.default.findByIdAndDelete(idComment);
        }
        else {
            throw new Error('You can delete only your comment!');
        }
    });
}
exports.delComment = delComment;
function getCmt(idVideo) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield comment_model_1.default.find({ videoId: idVideo });
    });
}
exports.getCmt = getCmt;
