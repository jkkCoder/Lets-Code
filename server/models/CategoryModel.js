import mongoose from "mongoose"

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        }
    ]
})

const Category = mongoose.model('Category', CategorySchema)

export default Category;