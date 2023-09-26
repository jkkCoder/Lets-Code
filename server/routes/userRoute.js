import {Router} from "express"
import { loginUser, registerUser } from "../controllers/userController.js";

const router = Router()

router.post("/login", loginUser)
router.post("/register", registerUser)

export default router;
