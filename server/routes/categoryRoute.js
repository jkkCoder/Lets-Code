import { Router } from "express";
import {fetchAllCategories, createCategory, addQuestionToCategory, deleteQuestionFromCategory, updateQuestionsInCategory} from "../controllers/categoryController.js"
import { admin, requireLogin } from "../middleware/authMiddleware.js";

const router = Router()

router.get('/allCategories', fetchAllCategories)        //public
router.post('/createCategory',requireLogin, admin, createCategory)          //admin protected
router.delete('/deleteQuesFromCategory/:categoryId/:questionId',requireLogin, admin, deleteQuestionFromCategory)    //admin protected
router.post('/addQuestionToCategory/:categoryId',requireLogin, admin, addQuestionToCategory)    //admin protected
router.put('/updateQuestionsInCategory/:categoryId', requireLogin, admin, updateQuestionsInCategory)       //admin protected


export default router;