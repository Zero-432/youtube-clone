"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const jwt_verifyToken_1 = require("../utils/jwt.verifyToken");
const router = (0, express_1.Router)();
//update user
router.put('/:id', jwt_verifyToken_1.verifyToken, user_controller_1.update);
//delete user
router.delete('/:id', jwt_verifyToken_1.verifyToken, user_controller_1.deleteUserHandler);
//get a user
router.get('/find/:id', user_controller_1.getUserHandler);
//subscribe a user
router.put('/sub/:id', jwt_verifyToken_1.verifyToken, user_controller_1.subscribe);
//unsubscribe a user
router.put('/unsub/:id', jwt_verifyToken_1.verifyToken, user_controller_1.unsubscribe);
//like a video
router.put('/like/:videoId', jwt_verifyToken_1.verifyToken, user_controller_1.like);
//dislike a video
router.put('/dislike/:videoId', jwt_verifyToken_1.verifyToken, user_controller_1.dislike);
exports.default = router;
