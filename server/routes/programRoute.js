import {Router} from "express"
import {runProgram,getStatusById} from "../controllers/programController.js"
import { requireLogin } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/status",requireLogin,getStatusById)
router.post("/run",requireLogin,runProgram)

export default router;