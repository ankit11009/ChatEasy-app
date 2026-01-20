import express from "express"
import authRouter from "./routes/auth.routes.js"
import messageRouter from "./routes/message.routes.js"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express()


app.use(cors({
    origin:process.env.CORS_ORIGIN, // humlog kis kis url se req accept kr rhe hai we have define it inot .env file
    credentials:true
}))


app.use(express.json()) // req.body
app.use(express.urlencoded({limit:"16kb",credentials:true}))
app.use(express.static("public"))
app.use(cookieParser())




app.use("/api/v1/auth",authRouter)
app.use("/api/v1/message",messageRouter)







export {app}