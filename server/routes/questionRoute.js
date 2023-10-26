import {Router} from "express"
import { bookmarkQuestion, createQuestion, deleteQuestion, fetchQuestionData, fetchQuestions, filterQuestions, searchProfile, searchQuestion, updateQuestion } from "../controllers/questionController.js";
import { admin, requireLogin } from "../middleware/authMiddleware.js";

const router = Router();

router.get('/getQuestions', fetchQuestions)
router.get('/filterQuestions', filterQuestions)
router.get('/search', searchQuestion)   
router.get('/searchProf', searchProfile)       
router.route('/:id')
    .get(fetchQuestionData)
    .put(requireLogin, admin, updateQuestion)        //admin protected
    .delete(requireLogin, admin, deleteQuestion)     //admin protected

router.post('/createQuestion', requireLogin, admin, createQuestion)  //admin protected
router.post('/bookmarkQuestion', requireLogin, bookmarkQuestion)

export default router;