import mongoose from "mongoose"

const QuestionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type:String,
        required:true,
    },
    testCases:[
        {
            input:{
                type:String,
                required: true
            },
            expectedOutput:{
                type: String,
                required: true
            },
            explanation: {
                type: String,
            }
        }
    ],
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

const Question = mongoose.model('Question', QuestionSchema)

export default Question