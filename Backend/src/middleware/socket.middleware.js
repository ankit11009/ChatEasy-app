import jwt from "jsonwebtoken"

import "dotenv/config"
import {apiError} from "../utils/apiError.js"


export const socketAuthMiddleware=async(socket,next) =>{
   try {
     //extracting token from http-only cookies
     const token=socket.handshake.headers.cookie?.
     split(";")
     .find((row)=>row.startsWith("jwt="))
     ?.split("=")[1];
 
     if(!token){
         throw new apiError(400,"Invalid credentials")
     }
 
     const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     if(!decoded){
         throw new apiError(400,"Invalid token")
     }
     
     
     const user= await User.findById(decodedToken?._id).select("-password -refreshToken")
     
     if(!user){
             // TODO: -> 
             throw new apiError(401,"Invalid access token")
     }
 

     //attach socket info to socket
     socket.user=user
     socket.userId=user._id.toString()
 
     next()
   } catch (error) {
    throw new apiError(401,error?.message || "Invalid access token")
   }


}