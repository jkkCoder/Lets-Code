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
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'], // Restrict to these values
        required: true,
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
    },
    bookmarkedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ]
})

const Question = mongoose.model('Question', QuestionSchema)

export default Question