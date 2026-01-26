import express from 'express'
import { Router } from 'express'
import { signUp,
        userLogin,
        userLogout,
        updateUserDeatils,
        updateAvatar
 } from '../controllers/user.controllers.js'
import { upload } from '../middleware/multer.middleware.js'
import {verifyJWT} from '../middleware/auth.middleware.js'
import { arcjetProtection } from '../middleware/arcjet.middleware.js'



const router=Router()

router.route("/test").get(arcjetProtection,(req,res)=>{
    return res.status(200).json({message:"Test successfully"})
})

router.route("/signUp").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
       
    ]),
    arcjetProtection,
    signUp
)


//instead of writing middleware everytime we can simly just

router.use(arcjetProtection) // this will run always if any of these req is occucred


router.route("/login").post(userLogin)
router.route("/logout").post(verifyJWT,userLogout)
router.route("/update").patch(verifyJWT,updateUserDeatils)
router.route("/update-avatar").patch(verifyJWT,upload.single("avatar"),updateAvatar)
router.route("/check").get(verifyJWT,(req,res)=>res.status(200).json(req.user))



export default router