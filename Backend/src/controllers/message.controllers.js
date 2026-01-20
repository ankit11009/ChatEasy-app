import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import { User } from "../model/user.model.js"


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
export {
    getAllContact
}