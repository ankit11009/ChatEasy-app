import mongoose, { mongo } from "mongoose";

const messageSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        trim:true,
        maxLenght:2000
    },
    image:{
        type:String
    },
},{
    timestamps:true
})

export const Message= mongoose.model("Message",messageSchema)