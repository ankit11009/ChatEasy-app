import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"  
import {User} from "../model/user.model.js"
import { apiError } from "../utils/apiError.js";
import cookieParser from "cookie-parser";
export const verifyJWT= asyncHandler(async(req,_,next)=>{
    // taking token acess->req ke pass cookie ka access hai,, cookies have all data and we can acess cookie through cookieParser middleware
    
    
    //get the access token from the req , no matter where the client sent it from
    // cookies-> browse-based app
    // Authorization header-> mobile apps,postman,Apis
  try{
    // cookies se token le lo ya phir authorization se le lo
      const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
      console.log("token:",token);
      

    if(!token){
        throw new apiError(401,"Unauthorized request")
    }
    // token generate and verify  krwa skte h lekin decode wahi krpayega jiske pass secret hoga 
    // decoded token
     const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)


    const user= await User.findById(decodedToken?._id).select("-password -refreshToken")
    if(!user){
        // TODO: -> 
        throw new apiError(401,"Invalid access token")
    }

    req.user=user;
    next() // when we inject middleware in routes next() only tells to move next after middleware
  }
  catch(error){
    throw new apiError(401,error?.message || "Invalid access token")
  }
})