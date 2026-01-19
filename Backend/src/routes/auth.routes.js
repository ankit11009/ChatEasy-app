import express from 'express'
import { Router } from 'express'
import { signUp,
        userLogin,
        userLogout
 } from '../controllers/user.controllers.js'
import { upload } from '../middleware/multer.middleware.js'
import {verifyJWT} from '../middleware/auth.middleware.js'



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
router.route("/login").post(userLogin)
router.route("/logout").post(verifyJWT,userLogout)



export default router