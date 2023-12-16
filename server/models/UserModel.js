import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false,
        required: true
    },
    profilePic:{
        type: String,
        default: undefined,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
})

const User = mongoose.model('User', UserSchema )

export default User;