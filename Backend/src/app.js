import express from "express"
import authRouter from "./routes/auth.routes.js"
import dotenv from "dotenv"
import cors from "cors"


const app=express()


app.use(cors({
    origin:process.env.CORS_ORIGIN, // humlog kis kis url se req accept kr rhe hai we have define it inot .env file
    credentials:true
}))


app.use(express.json) // req.body




app.use("/api/auth/users",authRouter)






export {app}