import { Router } from "express";
import {fetchAllCategories, createCategory, addQuestionToCategory, deleteQuestionFromCategory} from "../controllers/categoryController.js"
import { admin, requireLogin } from "../middleware/authMiddleware.js";

const router = Router()

router.get('/allCategories', fetchAllCategories)        //public
router.post('/createCategory',requireLogin, admin, createCategory)          //admin protected
router.delete('/deleteQuesFromCategory/:categoryId/:questionId',requireLogin, admin, deleteQuestionFromCategory)    //admin protected
router.post('/addQuestionToCategory/:categoryId',requireLogin, admin, addQuestionToCategory)    //admin protected


export default router;