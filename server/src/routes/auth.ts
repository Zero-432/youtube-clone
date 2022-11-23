import { Router } from 'express'
import { signin, signup } from '../controllers/auth.controller'

const router = Router()

// create a user
router.post('/signup', signup)

// sign in user
router.post('/signin', signin)

// google auth
export default router
