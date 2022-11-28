import { Router } from 'express'
import { addVideo, addView, deleteVideo, getVideo, updateVideo } from '../controllers/video.controller'
import { verifyToken } from '../utils/jwt.verifyToken'

const router = Router()

//create a video
router.post('/', verifyToken, addVideo)

//update a video
router.put('/:id', verifyToken, updateVideo)

//delete a video
router.delete('/:id', verifyToken, deleteVideo)

//get a video
router.get('/find/:id', getVideo)

//add view
router.put('/view/:id', addView)

export default router
