import { Router } from "express";
import {fetchAllCategories, createCategory} from "../controllers/categoryController.js"
import { admin, requireLogin } from "../middleware/authMiddleware.js";

const router = Router()

router.get('/allCategories', fetchAllCategories)        //public
router.post('/createCategory',requireLogin, admin, createCategory)          //admin protected


export default router;