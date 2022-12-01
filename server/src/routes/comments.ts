import { Router } from 'express'
import { addComment, deleteComment, getComment } from '../controllers/comment.controller'
import { verifyToken } from '../utils/jwt.verifyToken'

const router = Router()

// add comments
router.post('/', verifyToken, addComment)

// delete comments
router.delete('/:id', verifyToken, deleteComment)

// get comments
router.get('/:videoId', getComment)

export default router
