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
exports.library = exports.search = exports.getByTag = exports.sub = exports.trend = exports.random = exports.addView = exports.getVideo = exports.deleteVideo = exports.updateVideo = exports.addVideo = void 0;
const Logging_1 = __importDefault(require("../library/Logging"));
const video_service_1 = require("../service/video.service");
const Error_1 = __importDefault(require("../utils/Error"));
const addVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newVideo = yield (0, video_service_1.createVideo)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.body);
        yield newVideo.save();
        res.status(200).json(newVideo);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.addVideo = addVideo;
const updateVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const updatedVideo = yield (0, video_service_1.update)(req.params.id, (_b = req.user) === null || _b === void 0 ? void 0 : _b.id, req.body);
        res.status(200).json(updatedVideo);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.updateVideo = updateVideo;
const deleteVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        yield (0, video_service_1.deleteVid)(req.params.id, (_c = req.user) === null || _c === void 0 ? void 0 : _c.id);
        res.status(200).json('The video has been deleted.');
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.deleteVideo = deleteVideo;
const getVideo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield (0, video_service_1.getVid)(req.params.id);
        res.status(200).json(video);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.getVideo = getVideo;
const addView = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, video_service_1.addViewVid)(req.params.id);
        res.status(200).json('The view has been increased.');
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.addView = addView;
const random = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield (0, video_service_1.randomVideo)();
        res.status(200).json(videos);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.random = random;
const trend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield (0, video_service_1.trendVideo)();
        res.status(200).json(videos);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.trend = trend;
const sub = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const listSubscribedVideos = yield (0, video_service_1.subVideo)((_d = req.user) === null || _d === void 0 ? void 0 : _d.id);
        res.status(200).json(listSubscribedVideos.flat().sort((a, b) => b.createdAt - a.createdAt));
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.sub = sub;
const getByTag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield (0, video_service_1.tagVideo)(req.query.tags);
        res.status(200).json(videos);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.getByTag = getByTag;
const search = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield (0, video_service_1.searchVideo)(req.query.q);
        res.status(200).json(videos);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.search = search;
const library = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const listVideo = yield (0, video_service_1.listVid)((_e = req.user) === null || _e === void 0 ? void 0 : _e.id);
        res.status(200).json(listVideo);
    }
    catch (err) {
        Logging_1.default.error(err);
        (0, Error_1.default)(err, res);
    }
});
exports.library = library;
