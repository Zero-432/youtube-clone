"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment.controller");
const jwt_verifyToken_1 = require("../utils/jwt.verifyToken");
const router = (0, express_1.Router)();
// add comments
router.post('/', jwt_verifyToken_1.verifyToken, comment_controller_1.addComment);
// delete comments
router.delete('/:id', jwt_verifyToken_1.verifyToken, comment_controller_1.deleteComment);
// get comments
router.get('/:videoId', comment_controller_1.getComment);
exports.default = router;
