import express from "express"
import { getAllContact,
         getMessageByUserId,
         sendMessage,
         getChatPartners
 } from "../controllers/message.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { arcjetProtection } from "../middleware/arcjet.middleware.js"


const router=express.Router()

router.use(arcjetProtection,verifyJWT)

router.route("/all-contacts").get(getAllContact)
router.route("/chats").get(getChatPartners)
router.route("/:id").get(getMessageByUserId)
router.route("/send/:id").post(sendMessage)

export default router