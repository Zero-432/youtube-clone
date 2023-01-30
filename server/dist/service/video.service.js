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
exports.listVid = exports.searchVideo = exports.tagVideo = exports.subVideo = exports.trendVideo = exports.randomVideo = exports.addViewVid = exports.getVid = exports.deleteVid = exports.update = exports.createVideo = void 0;
const video_model_1 = __importDefault(require("../models/video.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
function createVideo(id, input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield new video_model_1.default(Object.assign(Object.assign({}, input), { userId: id }));
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.createVideo = createVideo;
function update(idVideo, idUser, input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const video = yield video_model_1.default.findById(idVideo);
            if (!video) {
                throw new Error('Video not found!');
            }
            if (idUser === video.userId) {
                return video_model_1.default.findByIdAndUpdate(idVideo, {
                    $set: input,
                }, {
                    new: true,
                });
            }
            else {
                throw new Error('You can update only your video!');
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.update = update;
function deleteVid(idVideo, idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const video = yield video_model_1.default.findById(idVideo);
            if (!video) {
                throw new Error('Video not found!');
            }
            if (idUser === video.userId) {
                return video_model_1.default.findByIdAndDelete(idVideo);
            }
            else {
                throw new Error('You can update only your video!');
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.deleteVid = deleteVid;
function getVid(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return video_model_1.default.findById(id);
    });
}
exports.getVid = getVid;
function addViewVid(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return video_model_1.default.findByIdAndUpdate(id, {
            $inc: { views: 1 },
        });
    });
}
exports.addViewVid = addViewVid;
function randomVideo() {
    return __awaiter(this, void 0, void 0, function* () {
        return video_model_1.default.aggregate([{ $sample: { size: 40 } }]);
    });
}
exports.randomVideo = randomVideo;
function trendVideo() {
    return __awaiter(this, void 0, void 0, function* () {
        return video_model_1.default.find().sort({ views: -1 });
    });
}
exports.trendVideo = trendVideo;
function subVideo(idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findById(idUser);
            const subscribedChannels = user === null || user === void 0 ? void 0 : user.subscribedUsers;
            const list = yield Promise.all(subscribedChannels.map((channelId) => __awaiter(this, void 0, void 0, function* () {
                return yield video_model_1.default.find({ userId: channelId });
            })));
            return list;
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.subVideo = subVideo;
function tagVideo(tagsVideo) {
    return __awaiter(this, void 0, void 0, function* () {
        const tags = tagsVideo.split(',');
        return yield video_model_1.default.find({ tags: { $in: tags } }).limit(20);
    });
}
exports.tagVideo = tagVideo;
function searchVideo(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield video_model_1.default.find({ title: { $regex: input, $options: 'i' } }).limit(40);
    });
}
exports.searchVideo = searchVideo;
function listVid(idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield video_model_1.default.find({ userId: idUser });
    });
}
exports.listVid = listVid;
