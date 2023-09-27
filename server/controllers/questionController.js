import Question from '../models/QuestionModel.js'

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
        const question = await Question.findById(req.params.id)

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

// POST      /question/     PROTECtED, ADMIN
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
