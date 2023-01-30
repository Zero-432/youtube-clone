"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const video_controller_1 = require("../controllers/video.controller");
const jwt_verifyToken_1 = require("../utils/jwt.verifyToken");
const router = (0, express_1.Router)();
//create a video
router.post('/', jwt_verifyToken_1.verifyToken, video_controller_1.addVideo);
//update a video
router.put('/:id', jwt_verifyToken_1.verifyToken, video_controller_1.updateVideo);
//delete a video
router.delete('/:id', jwt_verifyToken_1.verifyToken, video_controller_1.deleteVideo);
//get a video
router.get('/find/:id', video_controller_1.getVideo);
//add view
router.put('/view/:id', video_controller_1.addView);
//random
router.get('/random', video_controller_1.random);
//trend
router.get('/trend', video_controller_1.trend);
//sub
router.get('/sub', jwt_verifyToken_1.verifyToken, video_controller_1.sub);
//library
router.get('/library', jwt_verifyToken_1.verifyToken, video_controller_1.library);
//tag
router.get('/tags', video_controller_1.getByTag);
//search
router.get('/search', video_controller_1.search);
exports.default = router;
