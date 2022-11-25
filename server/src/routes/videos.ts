import { Router } from "express";
import { addVideo } from "../controllers/video.controller";
import { verifyToken } from "../utils/jwt.verifyToken";

const router = Router()

//create a video
router.post('/', verifyToken, addVideo)

export default router