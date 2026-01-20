import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import { User } from "../model/user.model.js"
import { Message } from "../model/message.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"



const getAllContact=asyncHandler(async(req,res)=>{
    const loggedInUserId=req.user?._id
    if(!loggedInUserId){
        throw new apiError(400,"User is not logged in...")
    }
    const filterUser=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
    
    
    if(!filterUser){
        throw new apiError(400,"Something wenet wrong while getting all contact")
    }

    return res.status(200).
    json(
         new apiResponse(
            200,
            filterUser,
            "All contact fetched successfully"
         )
    )
})

const getMessageByUserId=asyncHandler(async(req,res)=>{
    const myId=req.user._id
    const {id:userToChatId}=req.params

    const message=await Message.find({
        $or:[
            {senderId:myId,receiverId:userToChatId},
            {senderId:userToChatId,receiverId:myId}
        ]
    })

    return res.status(200).
    json(
        new apiResponse(
            200,
            message,
            "Messages fetched successfully"
        )
    )
})

const sendMessage=asyncHandler(async(req,res)=>{
    const {text,image}=req.body
    const {id:receiverId}=req.params
    const senderId=req.user._id

    console.log("receiverId:",receiverId);
    console.log("senderId:",senderId);
    
    

    let imageUrl
    if(image){
        const uploadResponse=await uploadOnCloudinary(image)
        imageUrl=uploadResponse.url
    }

    const newMessage=new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl

    })
    await newMessage.save()
    console.log("message:",newMessage);
     
    

    return res.status(200).
    json(
        new apiResponse(
            200,
            newMessage,
            "Message fetched  successfully"
        )
    )
})
export {
    getAllContact,
    getMessageByUserId,
    sendMessage
}