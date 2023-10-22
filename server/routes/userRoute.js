import {Router} from "express"
import { getUserByToken, loginUser, registerUser, userProfile } from "../controllers/userController.js";

const router = Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.get('/getUser/:token', getUserByToken)
router.get('/profile/:userId', userProfile)

export default router;
