import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js"
import "dotenv/config"


export const socketAuthMiddleware=async(socket,next)=>{
    try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];


      if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

     const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);

    next();



    } catch (error) {
        console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  
    }
}