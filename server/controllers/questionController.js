import Question from '../models/QuestionModel.js'
import Solution from '../models/SolutionModel.js'

// GET      /question/getQuestions      PUBLIC
export const fetchQuestions = async (req,res) => {
    try{
        const questions = await Question.find({}).select('title difficulty')
        return res.status(200).json({ success: true, questions })
    }catch(err){
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

// GET      /question/:id      PUBLIC
export const fetchQuestionData = async (req,res) => {
    try{
        const question = await Question.findById(req.params.id).populate('Category','name')

        if(!question){
            return res.status(400).json({success: false, message: 'Question not found'})
        }

        return res.status(200).json({ success: true, question })
    }catch(err){
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

// PUT      /question/:id      PROTECTED, ADMIN
export const updateQuestion = async (req,res) => {
    const {updatedQuestion} = req.body
    try{
        const question = await Question.findByIdAndUpdate(req.params.id, updatedQuestion, 
            {
                new: true
            }
        )
        if(!question){
            return res.status(400).json({success: false, message: 'Question not found'})
        }

        return res.status(200).json({success: true, message: 'Updated successfully'})
    }catch(err){
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

// DELETE      /question/:id      PROTECTED, ADMIN
export const deleteQuestion = async (req,res) => {
    try{
        const question = await Question.findByIdAndDelete(req.params.id)
        if(!question){
            return res.status(400).json({success: false, message: 'Question not found'})
        }

        return res.status(200).json({success: true, message: 'Question deleted successfully'})
    }catch(err){
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

// POST      /question/createQuestion     PROTECtED, ADMIN
export const createQuestion = async (req,res) => {
    try{
        const { title, description, difficulty, testCases, category=null } = req.body;
        const existingQuestion = await Question.findOne({title})
        if(existingQuestion){
            return res.status(400).json({success: false, message: 'A question with this title already exists'})
        }
        const question = new Question({
            title,
            difficulty,
            description,
            testCases,
            Category: category  //this should be category's id
        })
        await question.save()
        return res.status(201).json({success: true, message: 'Question created successfully', payload:{
            question
        }})
    }catch(err){
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

// GET      /question/filterQuestions     PUBLIC
export const filterQuestions = async(req,res) => {

    try{
        const {difficulty, status, userId} = req.query

        const query = {};
        if(difficulty){
            query.difficulty = {$in: difficulty.split(',')}
        }

        if(userId && status) {
            const solutions = await Solution.find({
                user: userId
            })
            const questionIds = solutions.map(solution => solution.question)

            query._id = status === 'solved' ?  { $in: questionIds } : {$nin: questionIds };
        }
        
        const questions = await Question.find(query);
        return res.json({
            success: true,
            questions
        });
    }catch(err){
        console.log("error is ", err)
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

// GET      /question/search     PUBLIC
export const searchQuestion = async (req,res) => {
    try{
        const {query} = req.query
        const regex = new RegExp(query, "i");
        const questions = await Question.find({ title: { $regex: regex } }).select('title description').limit(15)

        res.json({ questions });
    }catch(err){
        console.log("error is ",err)
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}