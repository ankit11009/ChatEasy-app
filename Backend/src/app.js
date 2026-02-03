import express from "express"
import authRouter from "./routes/auth.routes.js"
import messageRouter from "./routes/message.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import 'dotenv/config'




const app = express();






app.use(cors({
  origin:[
    "https://chat-easy-app.vercel.app",
    "https://chat-easy-app-ankit-kumars-projects-481fdceb.vercel.app",
    "https://chat-easy-dqabtrkkp-ankit-kumars-projects-481fdceb.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));






app.use(express.json({limit:"5mb"})) // req.body
app.use(express.urlencoded({limit:"5mb",credentials:true,extended:true}))
app.use(express.static("public"))

app.use(cookieParser())




app.use("/api/v1/auth",authRouter)
app.use("/api/v1/message",messageRouter)







export {app}