import {Server} from "socket.io"
import http from "http"
import express from "express"
import "dotenv/config"
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js"


const app=express()
const server=http.createServer(app)


const io=new Server(server,{
    cors:{
        origin:process.env.CORS_ORIGIN,
        credentials:true,
    }
})







io.use(socketAuthMiddleware)


const userSocketMap =new Map(); // {userId:socketId}
const disconnectTimers=new Map()


io.on("connection", (socket) => {
  const userId = socket.user._id.toString();

  console.log("User connected:", socket.user.fullName);

  // 🟢 Cancel pending disconnect (reload case)
  if (disconnectTimers.has(userId)) {
    clearTimeout(disconnectTimers.get(userId));
    disconnectTimers.delete(userId);
  }

  // add socket
  if (!userSocketMap.has(userId)) {
    userSocketMap.set(userId, new Set());
  }
  userSocketMap.get(userId).add(socket.id);

  // emit online users
  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);

    // 🟡 Delay removal (grace period)
    const timeoutId = setTimeout(() => {
      const sockets = userSocketMap.get(userId);

      if (sockets) {
        sockets.delete(socket.id);

        if (sockets.size === 0) {
          userSocketMap.delete(userId);
          io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
        }
      }

      disconnectTimers.delete(userId);
    }, 5000); // ⏳ 5 seconds grace (perfect balance)

    disconnectTimers.set(userId, timeoutId);
  });
});




// io.on("connection", (socket) => {
//   console.log("A user connected", socket.user.fullName);

//   const userId = socket.user._id.toString();
//   userSocketMap[userId] = socket.id;

//   // io.emit() is used to send events to all connected clients
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // with socket.on we listen for events from clients
//   socket.on("disconnect", () => {
//     console.log("A user disconnected", socket.user.fullName);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });


export {io,app,server}