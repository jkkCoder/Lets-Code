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
        console.log({questions,name})

        if(!questions || questions.length == 0){
            return res.status(400).json({success: false, message: 'There should be atleast one question'})
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