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
exports.dislikeVideo = exports.likeVideo = exports.unsubscribeUser = exports.subscribeUser = exports.getUser = exports.deleteUser = exports.updateUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const video_model_1 = __importDefault(require("../models/video.model"));
function updateUser(id, input) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.findByIdAndUpdate(id, {
            $set: input,
        }, { new: true });
    });
}
exports.updateUser = updateUser;
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.findByIdAndDelete(id);
    });
}
exports.deleteUser = deleteUser;
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.default.findById(id);
    });
}
exports.getUser = getUser;
function subscribeUser(idUser, idOther) {
    return __awaiter(this, void 0, void 0, function* () {
        const subscribe = {
            subscribeUser: user_model_1.default.findByIdAndUpdate(idUser, {
                $push: { subscribedUsers: idOther },
            }),
            subscriber: user_model_1.default.findByIdAndUpdate(idOther, {
                $inc: { subscribers: 1 },
            }),
        };
        return subscribe;
    });
}
exports.subscribeUser = subscribeUser;
function unsubscribeUser(idUser, idOther) {
    return __awaiter(this, void 0, void 0, function* () {
        const unsubscribe = {
            subscribeUser: user_model_1.default.findByIdAndUpdate(idUser, {
                $pull: { subscribedUsers: idOther },
            }),
            subscriber: user_model_1.default.findByIdAndUpdate(idOther, {
                $inc: { subscribers: -1 },
            }),
        };
        return unsubscribe;
    });
}
exports.unsubscribeUser = unsubscribeUser;
function likeVideo(idUser, idVideo) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield video_model_1.default.findByIdAndUpdate(idVideo, {
            $addToSet: { likes: idUser },
            $pull: { dislikes: idUser },
        });
    });
}
exports.likeVideo = likeVideo;
function dislikeVideo(idUser, idVideo) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield video_model_1.default.findByIdAndUpdate(idVideo, {
            $addToSet: { dislikes: idUser },
            $pull: { likes: idUser },
        });
    });
}
exports.dislikeVideo = dislikeVideo;
