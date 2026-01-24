import React from 'react'
import { useAuthStore } from '../Store/useAuth'
const ChatPage = () => {
    const {logout}=useAuthStore()
  return (
    <div className='z-10'>ChatPage
        <button onClick={logout} className='w-30 '>Logout</button>
    </div>
  )
}

export default ChatPage