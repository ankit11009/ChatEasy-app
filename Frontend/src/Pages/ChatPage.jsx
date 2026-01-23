import React from 'react'
import { useAuthStore } from '../Store/useAuth'
const ChatPage = () => {
    const {authUser,isLoggedIn,login}=useAuthStore()
  return (
    <div>ChatPage</div>
  )
}

export default ChatPage