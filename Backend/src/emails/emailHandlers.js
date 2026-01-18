import { resendClient } from "../lib/resend.js";
import { apiError } from "../utils/apiError.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import { sender } from "../lib/resend.js";


export const sendWelcomeEmail=async(email,name,clientURL)=>{
    const {data,error}=await resendClient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject:"Welcome to ChateEasy!",
        html:createWelcomeEmailTemplate(name,clientURL)
    })
    if(error){
        console.error("Error sending welcome email:",error);
        throw new apiError(400,"something went wrong in sending email")
        
    }
    else{
        console.log("Welcome email send successfully")
    }
}