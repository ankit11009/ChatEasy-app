import express from "express"
import authRouter from "./routes/auth.routes.js"
import messageRouter from "./routes/message.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import { app } from "./lib/socket.js"



const allowedOrigins = [
  "https://chat-easy-app-git-main-ankit-kumars-projects-481fdceb.vercel.app",
  "https://chat-easy-ez0crg1sr-ankit-kumars-projects-481fdceb.vercel.app",
  "https://chat-easy-app.vercel.app" // Add your main production domain if you have one
];


    
app.use(cors({
    origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl) 
    // or if the origin is in our allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
    credentials:true,
    methods:["GET","POST","DELETE","OPTIONS","PATCH"],
    allowedHeaders:["Content-Type","Authorization"]
}))






app.use(express.json({limit:"5mb"})) // req.body
app.use(express.urlencoded({limit:"5mb",credentials:true,extended:true}))
app.use(express.static("public"))

app.use(cookieParser())




app.use("/api/v1/auth",authRouter)
app.use("/api/v1/message",messageRouter)







export {app}