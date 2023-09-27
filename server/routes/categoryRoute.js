import { Router } from "express";
import {fetchAllCategories, createCategory} from "../controllers/categoryController.js"

const router = Router()

router.get('/allCategories', fetchAllCategories)        //public
router.post('/createCategory', createCategory)          //admin protected


export default router;