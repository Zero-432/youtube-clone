import { Router } from 'express'
import { deleteUserHandler, dislike, getUserHandler, like, subscribe, unsubscribe, update } from '../controllers/user.controller'
import { verifyToken } from '../utils/jwt.verifyToken'

const router = Router()

//update user
router.put('/:id', verifyToken, update)

//delete user
router.delete('/:id', verifyToken, deleteUserHandler)

//get a user
router.get('/find/:id', getUserHandler)

//subscribe a user
router.put('/sub/:id', verifyToken, subscribe)

//unsubscribe a user
router.put('/unsub/:id', verifyToken, unsubscribe)

//like a video
router.put('/like/:videoId', verifyToken, like)

//dislike a video
router.put('/dislike/:videoId', verifyToken, dislike)

export default router
