import express from "express"
import { getReceiverSocketId, io } from "../lib/socket.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import { User } from "../model/user.model.js"
import { Message } from "../model/message.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { log } from "console"



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
    const myId=req.user?._id
    const {id:userToChatId}=req.params

    const messages=await Message.find({
        $or:[
            {userId:myId,receiverId:userToChatId},
            {userId:userToChatId,receiverId:myId}
        ]
    })
   
    

    return res.status(200).
    json(
        new apiResponse(
            200,
            messages,
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
        userId:senderId,
        receiverId,
        text,
        image:imageUrl

    })
    await newMessage.save()

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(socketId).emit sends to a specific user
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

     
    

    return res.status(200).
    json(
        new apiResponse(
            200,
            newMessage,
            "Message fetched  successfully"
        )
    )
})


const getChatPartners=asyncHandler(async(req,res)=>{
    const loggedInUserId=req.user?._id
   
    
    if(!loggedInUserId){
        throw new apiError(400,"User is not logged in!!!")
    }
    const messages= await Message.find({
        $or:[{userId:loggedInUserId},{receiverId:loggedInUserId}]
    })

    

    const chatPartnerId= [
        ...new Set(messages.map((msg)=> msg.userId.toString()==loggedInUserId.toString()? msg.receiverId.toString():msg.userId.toString())),
    ];
 
    

    const chatPartners=await User.find({_id:{$in:chatPartnerId}}).select("-password")
    if(!chatPartners){
        throw new apiError(400,"Something went wrong while getting chat partners")
    }

    return res.status(200).
    json(
       new apiResponse(
         200,
        chatPartners,
        "Chat partner is fetched successfully"
       )
    )
})
export {
    getAllContact,
    getMessageByUserId,
    sendMessage,
    getChatPartners
}