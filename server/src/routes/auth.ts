import { Router } from 'express'
import { signin, signup, googleAuth } from '../controllers/auth.controller'

const router = Router()

// create a user
router.post('/signup', signup)

// sign in user
router.post('/signin', signin)

// google auth
router.post('/google', googleAuth)

export default router
