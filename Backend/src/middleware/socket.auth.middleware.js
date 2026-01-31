import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js"
import "dotenv/config"
import cookie from "cookie"


export const socketAuthMiddleware=async(socket,next)=>{
    try {
    // const token1 = socket.handshake.headers.cookie
    //   ?.split(";")
    //   .find((row) => row.startsWith("jwt="))
    //   ?.split("=")[1];
    // const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const cookieHeader = socket.handshake.headers.cookie;

      const cookies = cookie.parse(cookieHeader);
    const token = cookies.accessToken; 
    // const token = cookies.jwt;

    console.log("token:",token);
    // console.log("token:",token1);
    

      if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

     const user = await User.findById(decoded._id).select("-password");
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