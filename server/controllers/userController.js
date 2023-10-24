import User from "../models/UserModel.js"
import Solution from "../models/SolutionModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { isValidEmail, isValidPassword } from "../utils/constants.js"
import Question from "../models/QuestionModel.js"


// POST     /user/login     PUBLIC API      
export const loginUser = async(req,res) => {
    const {loginField, password} = req.body

    try{

        if(!loginField || !password){
            return res.status(400).json({success: false, message: "Please provide all required fields"})
        }

        const existingUser = await User.findOne({
            $or: [{ userName: loginField }, { email: loginField }],
        });

        if(!existingUser){
            return res.status(400).json({success: false, message: "User not found, Kindly register"})
        }

        if(await bcrypt.compare(password, existingUser?.password)){
            //generate jwt token
            const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET)
            return res.status(201).json({success: true, message: "user Log in successful", payload:{
                jwtToken: token,
                userName: existingUser?.userName,
                email: existingUser?.email,
                isAdmin: existingUser?.isAdmin,
                fullName: existingUser?.fullName,
                _id: existingUser?._id
            }})
        }

        return res.status(400).json({success: false, message: "Invalid credentials"})
    }catch(err){
        return res.status(500).json({success: false, message: "Internal server error", errorMessage: err})
    }
}

// POST     /user/register     PUBLIC API      
export const registerUser = async (req,res) => {
    const {email, fullName, userName, password} = req.body

    if(!email || !fullName || !userName || !password){
        return res.status(400).json({success: false, message: "Please provide all required fields"})
    }

    try{
        const existingUser = await User.findOne({
            $or: [{ userName: userName }, { email: email }],
        });

        if(existingUser){
            return res.status(400).json({success: false, message: "User already exists with given username or email"})
        }

        if(!isValidEmail(email)){
            return res.status(400).json({success: false, message: "Email is not valid"})
        }
    
        if(!isValidPassword(password)){
            return res.status(400).json({success:false, message: "Password must contain one Upper case letter, alphanumeric and a special character"})
        }

        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = new User({
            userName,
            fullName,
            email,
            password:hashedPassword
        })
        await user.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        return res.status(201).json({success: true, message: "user Registered successful", payload:{
            jwtToken: token,
            userName: user?.userName,
            email: user?.email,
            isAdmin: user?.isAdmin,
            fullName: user?.fullName,
            _id: user?._id
        }})


    }catch(err){
        return res.status(500).json({success: false, message: "Internal server error", errorMessage: err})
    }

}

// GET     /user/getUser/:token     PUBLIC API      
export const getUserByToken = async (req, res) => {
    const {token} = req.params
    try{
        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            const user = await User.findById(payload?.id).select("-password")
            if(err || !user){
                return res.status(400).json({success: false, message: 'Token expired', userPayload: {}})
            } 
            return res.status(200).json({success: true, message: "Fetch successful", userPayload: user})
        })
    }catch(err) {
        return res.status(500).json({success: false, message: "Internal server error", userPayload: {}})
    }
}

// GET     /user/profile/:userId     PUBLIC API      
export const userProfile = async (req,res) => {
    const {userId} = req.params
    try{
        const user = await User.findById(userId).select('userName fullName email')

        const solvedQuestions = await Solution.find({user: userId}).select('question').populate('question','title difficulty')
        const easySolvedQuestions = solvedQuestions.filter(question => question?.question?.difficulty === 'easy')
        const mediumSolvedQuestions = solvedQuestions.filter(question => question?.question?.difficulty === 'medium')
        const hardSolvedQuestions = solvedQuestions.filter(question => question?.question?.difficulty === 'hard')


        const totalEasy = await Question.find({difficulty: "easy"}).countDocuments()
        const totalMedium = await Question.find({difficulty: "medium"}).countDocuments()
        const totalHard = await Question.find({difficulty: "hard"}).countDocuments()

        return res.json({
            success: true, 
            userData:user, 
            solved:{
                easy : easySolvedQuestions,
                medium: mediumSolvedQuestions,
                hard: hardSolvedQuestions
            },
            solvedStatistics: {
                easySolved: easySolvedQuestions.length,
                mediumSolved: mediumSolvedQuestions.length,
                hardSolved: hardSolvedQuestions.length,
                totalEasy,
                totalMedium,
                totalHard,
                unSolved: totalEasy + totalMedium + totalHard - easySolvedQuestions.length - mediumSolvedQuestions.length - hardSolvedQuestions.length
            }

        })
    }catch(err){
        return res.status(500).json({success: false, message: "Internal server error"})
    }
}