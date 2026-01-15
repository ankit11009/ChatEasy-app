import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import { User } from "../model/user.model.js"



const signUp=asyncHandler(async(req,res)=>{
    const {userName,email,password}=req.body

    if(!(userName || email || password)){
        throw new apiError(400,"All feilds are required!!!")
    }
    if(password.lenght<6){
        throw new apiError(400,"Password must be of 6 charachters")
    }


    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!emailRegex.test(email)){
        throw new apiError(400,"Invalid email")
    }
    const existedUser= await User.findOne({
        email
    })
    if(existedUser){
        throw new apiError(400,"Email exist!!!")
    }

    const avatarLocalpath=req?.files?.avatar?.[0]?.path
    if(!avatarLocalpath){
        throw new apiError(400,"Avatar file path not found")
    }
    const avatar=await uploadOnCloudinary(avatarLocalpath)

   

    const user= await User.create({
    fullName,
    email,
    password,
    avatar:avatar.url
})

const createduser=await User.findById(user._id).select(
    "-password -refreshToken"
)

return res.status(200).
json(
    new apiResponse(
        200,
        createduser,
        "User Registered successfully"
    )
)
})

export {
    signUp,

}