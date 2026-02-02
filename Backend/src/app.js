import express from "express"
import authRouter from "./routes/auth.routes.js"
import messageRouter from "./routes/message.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import { app } from "./lib/socket.js"





const allowedOrigins = [
  "https://chat-easy-app.vercel.app",
  "https://chat-easy-dqabtrkkp-ankit-kumars-projects-481fdceb.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));






app.use(express.json({limit:"5mb"})) // req.body
app.use(express.urlencoded({limit:"5mb",credentials:true,extended:true}))
app.use(express.static("public"))

app.use(cookieParser())




app.use("/api/v1/auth",authRouter)
app.use("/api/v1/message",messageRouter)







export {app}