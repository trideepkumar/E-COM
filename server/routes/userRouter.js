import express from "express"
import {
    authenticate,
    validateUser,
    verifyEmail,
    validateLogin,
    loginUser
} from '../controllers/authControllers.js'
const router = express.Router()


//auth

router.post("/register", validateUser, authenticate)
router.get("/verify/:token",verifyEmail)

router.post("/login", validateLogin, loginUser)



export default router