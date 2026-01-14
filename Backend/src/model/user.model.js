import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        reuqired:true,
        minlength:6,
    },
    avatar:{
        type:String,
        default:""
    }

},{
    timestamps:true
})


userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return;

    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}






export const User= mongoose.model("User",userSchema)