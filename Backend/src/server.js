import express from 'express'
import dotenv from 'dotenv'

import messageRouter from "./routes/message.routes.js"
import connectDB from './db/index.js'

import { app, server } from "./lib/socket.js"


dotenv.config(
   { path:'./.env'}
)










// app.use("/api/message",messageRouter)

const PORT=process.env.PORT

connectDB()

.then(()=>{
    server.listen(PORT || 80000,()=>console.log(`Server is running on ${PORT}`)) 
    app.on("error",(error)=>{
        console.log("Server error",error);
        
    })
})
.catch("error",(error)=>{
    console.log("Server connection error",error);
    
})


