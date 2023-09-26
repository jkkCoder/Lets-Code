import mongoose from "mongoose"

const SolutionSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }
})

const Solution = mongoose.model('Solution', SolutionSchema)

export default Solution;