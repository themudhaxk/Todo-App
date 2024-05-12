import express from "express"
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile } from "../controllers/userController.js"
import { authenticate } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.route('/').post(registerUser)

router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.route("/profile").get(authenticate, getUserProfile)
router.route("/profile").put(authenticate, updateUserProfile)

export default router