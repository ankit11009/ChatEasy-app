import express from 'express'
import { Router } from 'express'
import { signUp } from '../controllers/user.controllers.js'
import { upload } from '../middleware/multer.middleware.js'


const router=Router()



router.route("/signUp").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
       
    ]),
    signUp
)



export default router