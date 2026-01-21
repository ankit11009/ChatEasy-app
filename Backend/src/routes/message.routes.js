import express from "express"
import { getAllContact,
         getMessageByUserId,
         sendMessage
 } from "../controllers/message.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js"


const router=express.Router()

router.route("/all-contact").get(verifyJWT,getAllContact)
router.route("/chats").post(verifyJWT,getChatPartners)
router.route("/:id").get(verifyJWT,getMessageByUserId)
router.route("/send/:id").post(verifyJWT,sendMessage)

export default router