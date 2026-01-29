import React, { useRef, useState } from 'react'
import useKeyboardSound from '../hooks/useKeyboardSound.js'
import { useChatStore } from '../Store/useChat.js'

const MessageInput = () => {
   const{playRandomKeyStrokeSound}= useKeyboardSound()

   const [text,setText]=useState("")
   const [imagePrew,setImagePrew]=useState(null)

   const fileInputRef=useRef()
   const {isSoundEnabled,sendMessage}=useChatStore()
  return (
    <div>MessageInput</div>
  )
}

export default MessageInput