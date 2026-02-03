import express from 'express'
import dotenv from 'dotenv'


import connectDB from './db/index.js'

import { app } from './app.js'
import { server } from './lib/socket.js'

dotenv.config(
   { path:'./.env'}
)










// app.use("/api/message",messageRouter)

const PORT=process.env.PORT

connectDB()

.then(()=>{
    server.listen(PORT || 8000,()=>console.log(`Server is running on ${PORT}`)) 
    app.on("error",(error)=>{
        console.log("Server error",error);
        
    })
})
.catch("error",(error)=>{
    console.log("Server connection error",error);
    
})


