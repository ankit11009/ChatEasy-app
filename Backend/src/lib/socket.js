import {Server} from "socket.io"
import http from "http"
import express from "express"
import cors from "cors"
import dotenv from "dotenv" 
import 'dotenv/config'
import { socketAuthMiddleware } from "../middleware/socket.middleware.js"


const app=express()

const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:process.env.CORS_ORIGIN,
        credentials:true,
        methods:["GET","POST","DELETE","OPTIONS","PATCH"],
        allowedHeaders:["Content-Type","Authorization"]
    }
})



//this is for storing online users
io.use(socketAuthMiddleware)

//used for storing online users
const userSocketMap={}; //{userId:socketId}

io.on("connection",(socket)=>{
    console.log("A user connected",socket.user.fullName);


    const userId=socket.userId
    userSocketMap[userId]=socket.id


    //io.emit() is used to sends event to all connected clients

    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    //with socket.on we listen for events from clients

    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.user.fullName);
        delete userSocketMap[userId]
         io.emit("getOnlineUsers",Object.keys(userSocketMap))
        
    })
    
})

export {io,server,app}