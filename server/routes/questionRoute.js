import {Router} from "express"
import { createQuestion, deleteQuestion, fetchQuestionData, fetchQuestions, updateQuestion } from "../controllers/questionController.js";

const router = Router();

router.get('/getQuestions', fetchQuestions)
router.route('/:id')
    .get(fetchQuestionData)
    .put(updateQuestion)        //admin protected
    .delete(deleteQuestion)     //admin protected

router.post('/createQuestion', createQuestion)

export default router;