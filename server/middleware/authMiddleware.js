import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

export const requireLogin = async(req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(400).json({success: false, message: 'You must be logged in'})
    }

    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if(err){
            return res.status(400).json({success: false, message: 'You must be logged in'})
        }
        const user = await User.findById(payload.id)
        req.user = user   //payload.id contains the user 
        next()
    })
}

export const admin = async (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        return res.status(400).json({success: false, message: 'You are not authorized as an admin'})
    }  
}