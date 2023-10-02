import {Router} from "express"
import { getUserByToken, loginUser, registerUser } from "../controllers/userController.js";

const router = Router()

router.post("/login", loginUser)
router.post("/register", registerUser)
router.post('/getUser', getUserByToken)

export default router;
