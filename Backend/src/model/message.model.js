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
    },
    image:{
        type:String
    },
},{
    timestamps:true
})

export const Message= mongoose.model("Message",messageSchema)