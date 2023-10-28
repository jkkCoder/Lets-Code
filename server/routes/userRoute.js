import {Router} from "express"
import { editProfile, getBookmarks, getUserByToken, loginUser, registerUser, userProfile } from "../controllers/userController.js";
import { requireLogin } from "../middleware/authMiddleware.js";

const router = Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.get('/getUser/:token', getUserByToken)
router.get('/profile/:userId', userProfile)
router.put('/editProfile/:id', requireLogin, editProfile)
router.get('/getBookmarks', requireLogin, getBookmarks)      

export default router;
