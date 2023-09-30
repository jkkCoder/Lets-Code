import { Router } from "express";
import { requireLogin } from "../middleware/authMiddleware.js";
import { compileCode } from "../controllers/solutionController.js";
const router = Router()

router.post('/compile', requireLogin, compileCode)     // protected route

export default router;