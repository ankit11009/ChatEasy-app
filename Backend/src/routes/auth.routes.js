import express from 'express'

const router=express.Router()



router.get("/login",(req,res)=>{
    res.send("Login")
})
router.get("/signUp",(req,res)=>{
    res.send("Sign Up")
})
router.get("/logout",(req,res)=>{
    res.send("Logout")
})


export default router