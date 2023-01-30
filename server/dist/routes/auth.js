"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// create a user
router.post('/signup', auth_controller_1.signup);
// sign in user
router.post('/signin', auth_controller_1.signin);
// google auth
router.post('/google', auth_controller_1.googleAuth);
exports.default = router;
