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

//there should be atleast one question associated witht he category
CategorySchema.path('questions').validate(function (value) {
    return value.length > 0;
}, 'At least one question is required for each category.');

const Category = mongoose.model('Category', CategorySchema)

export default Category;