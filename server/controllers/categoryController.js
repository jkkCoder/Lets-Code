import Category from "../models/CategoryModel.js"
import Question from '../models/QuestionModel.js'

// GET      /category/allCategories      PUBLIC
export const fetchAllCategories =  async(req,res) => {
    try{
        const categories = await Category.find({}).populate({
            path: 'questions',
            select: 'title difficulty'
        })
        return res.send({
            success: true,
            categories
        })
    }catch(err){
        res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

// POST      /category/createCategory      ADMIN
export const createCategory = async ( req, res) => {
    try{
        const {questions, name} = req.body


        if(!name && name.length === 0){
            return res.status(400).json({success: false, message: "Name is an required field"})
        }

        //take atleast five questions
        if(!questions || questions.length < 5){
            return res.status(400).json({success: false, message: 'There should be atleast five questions'})
        }

        const newCategory = await new Category({
            name,
            questions
        })

        const savedCategory = await newCategory.save()

        //after saving now update the category id to the given array of questions
        await Question.updateMany(
            {_id: {$in: questions}} ,   //here questions is id
            {$set: {Category : savedCategory?._id}}
        )

        return res.status(201).json({success:true, message:'Category created successfully'})
    }catch(err){
        console.log('err is ', err)
        res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

// DELETE       /category/deleteQuesFromCategory/:categoryId/:questionId      ADMIN
export const deleteQuestionFromCategory = async (req, res) => {
    const {categoryId, questionId} = req.params
    try{
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            {$pull: {questions: questionId}},
            {new:true}
        )
        if(!updatedCategory){
            return res.status(400).json({success: false, message: "category not found"})
        }
        return res.status(200).json({success: true, message: "question deleted from category"})
    }catch(err){
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    } 
}


// POST         /category/addQuestionToCategory/:questionId       ADMIN
export const addQuestionToCategory = async (req,res) => {
    const {categoryId} = req.params
    const {questions} = req.body
    if(!questions || questions.length === 0){
        return res.status(400).json({success: false, message: 'There should be atleast one questions'})
    }
    try{
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            {$push: {questions: questions} },
            {new: true}
        )
        if(!updatedCategory){
            return res.status(400).json({success: false, message: "category not found"})
        }
        return res.status(200).json({success: true, message: "questions added to category"})
    }catch(err){
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}

// PUT         /category/updateQuestionsInCategory/:questionId       ADMIN
export const updateQuestionsInCategory = async (req,res) => {
    const {categoryId} = req.params
    const {questions} = req.body
    try{
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { $set: { questions: questions } },
            { new: true } 
        );
        if(!updatedCategory){
            return res.status(400).json({success: false, message: "category not found"})
        }
        return res.status(200).json({success: true, message: "questions added to category"})
    }catch(err){
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
}