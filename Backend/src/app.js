import express from "express"
import authRouter from "./routes/auth.routes.js"
import messageRouter from "./routes/message.routes.js"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import { app } from "./lib/socket.js"






    
app.use(cors({
    origin:"http://localhost:5173",
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