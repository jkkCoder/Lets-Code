import {Router} from "express"
import { createQuestion, deleteQuestion, fetchQuestionData, fetchQuestions, filterQuestions, searchQuestion, updateQuestion } from "../controllers/questionController.js";
import { admin, requireLogin } from "../middleware/authMiddleware.js";

const router = Router();

router.get('/getQuestions', fetchQuestions)
router.get('/filterQuestions', filterQuestions)
router.get('/search', searchQuestion)               
router.route('/:id')
    .get(fetchQuestionData)
    .put(requireLogin, admin, updateQuestion)        //admin protected
    .delete(requireLogin, admin, deleteQuestion)     //admin protected

router.post('/createQuestion', requireLogin, admin, createQuestion)  //admin protected

export default router;