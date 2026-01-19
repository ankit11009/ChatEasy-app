import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import { User } from "../model/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { sendWelcomeEmail } from "../emails/emailHandlers.js"
import 'dotenv/config'



const generateAccessTokenAndRefeshToken=async(userId)=>{
    // console.log("userId:",userId);
    
    try {
        const user=await User.findById(userId)
        // console.log("user:",user);
        
        const accessToken=user.generateAccessToken()
        // console.log("accessTOken",accessToken);
        const refreshToken=user.generateRefreshToken()
        // console.log("accessTOken",accessToken);
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new apiError(400,"Something went wrong in generating access and refresh token")
    }
}



const signUp=asyncHandler(async(req,res)=>{
    const {fullName,email,password}=req.body

    if(!fullName || !email || !password){
        throw new apiError(400,"All feilds are required!!!")
    }
    if(password.length<6){
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

    const avatarLocalpath=req.files?.avatar?.[0]?.path
    if(!avatarLocalpath){
        throw new apiError(400,"Avatar file path not found")
    }
    console.log(avatarLocalpath);
    
    const avatar=await uploadOnCloudinary(avatarLocalpath)
    if(!avatar){
        throw new apiError(400,"Avatar not uploaded successfully")
    }

   

    const user= await User.create({
    fullName,
    email,
    password,
    avatar:avatar.url,
})

const createduser=await User.findById(user._id).select(
    "-password -refreshToken"
)
try {
    await sendWelcomeEmail(user.email,user.fullName,process.env.CLIENT_URL)
} catch (error) {
    console.log("Failed to send email",error)
}

return res.status(200).
json(
    new apiResponse(
        200,
        createduser,
        "User Registered successfully"
    )
)

//calling function sendWelcomeEmail to send email



})


const userLogin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email){
        throw new apiError(400,"Email is required")
    }

    const userExicted=await User.findOne({
        email
    })
    if(!userExicted){
        throw new apiError(400,"Email doesn't exit")
    }

    const isPasswordCorrect= await userExicted.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new apiError(400,"Password is incorrect")
    }

    const {accessToken,refreshToken}= await generateAccessTokenAndRefeshToken(userExicted._id)


    const loggedInUser=await User.findById(userExicted._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:false
    }

    return res.status(200).
    cookie("accessToken",accessToken,options).
    cookie("refreshToken",refreshToken,options).
    json(
        new apiResponse(
            200,
            {
                existedUser:loggedInUser,accessToken,refreshToken
            },
            "user logged in successfully"
        )
    )

})

const userLogout=asyncHandler(async(req,res)=>{
    const logout=await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
        )

        const options={
            httpOnly:true,
            secure:false
        }

        return res.status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new apiResponse(
            200,
            {},
            "Logout successfully"
        ))

})
export {
    signUp,
    userLogin,
    userLogout
    

} 