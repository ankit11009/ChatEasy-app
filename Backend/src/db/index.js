import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
import dotenv from "dotenv"



const connectDB=async()=>{
    try {
        const DBconnection=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGODB succesfully connected!!!${DBconnection.connection.host}`);
    } catch (error) {
        console.log("Connection error",error);
        // process.exit(1)
        
    }
    
}


export default connectDB