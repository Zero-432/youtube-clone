import { Router } from 'express'
import { signup } from '../controllers/auth.controller'

const router = Router()

// create a user
router.post('/signup', signup)


export default router
