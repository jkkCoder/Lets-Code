import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const loginUser = async(req,res) => {
    const {loginField, password} = req.body

    try{

        const existingUser = await User.findOne({
            $or: [{ userName: loginField }, { email: loginField }],
        });

        if(!existingUser){
            return res.status(400).json({success: false, message: "User not found, Kindly register"})
        }

        if(await bcrypt.compare(password, existingUser?.password)){
            //generate jwt token
            const token = jwt.sign({id: existingUser}, process.env.JWT_SECRET)
            return res.status(200).json({success: true, message: "user Log in successful", payload:{
                jwtToken: token,
                userName: existingUser?.userName,
                email: existingUser?.email,
                fullname: existingUser?.fullName
            }})
        }

        return res.status(400).json({success: false, message: "Invalid credentials"})
    }catch(err){
        return res.status(500).json({success: false, message: "Internal server error", errorMessage: err})
    }
}

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
            return res.status(400).json({success: false, message: "User already exists, try logging in"})
        }

        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = new User({
            userName,
            fullName,
            email,
            password:hashedPassword
        })
        await user.save()

        const token = jwt.sign({id: user}, process.env.JWT_SECRET)
        return res.status(200).json({success: true, message: "user Registered successful", payload:{
            jwtToken: token,
            userName: user?.userName,
            email: user?.email,
            fullname: user?.fullName
        }})


    }catch(err){
        return res.status(500).json({success: false, message: "Internal server error", errorMessage: err})
    }

}