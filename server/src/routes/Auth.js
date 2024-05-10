import express from 'express'
const router = express.Router()
import { RegisterUserController } from '../controllers/Auth.js'
const controller = new RegisterUserController()

router.get('/validateEmail/:token', controller.validateEmail)
router.post('/create', controller.registerUser)
router.post('/login', controller.loginUser)

export default router
