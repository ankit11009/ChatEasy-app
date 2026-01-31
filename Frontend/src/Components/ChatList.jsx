import React, { useEffect } from 'react'
import { useChatStore } from '../Store/useChat.js'
import UsersLoadingSkeleton from './UserLoadingSkeleton'
import NoConversationPlaceholder from './NoConversationPlaceholder'
import NoChatsFound from './NoChatsFound'
import { useAuthStore } from '../Store/useAuth.js'


const ChatList = () => {

  const {getMyChatPartner,chats,isUserLoading,setSelectedUser}=useChatStore()
  const {onlineUsers}=useAuthStore()

  //it will get all chat partner 

  useEffect(()=>{getMyChatPartner()},[])
  if(isUserLoading) return <UsersLoadingSkeleton/> 
  
  if(chats.length===0) return <NoChatsFound/>

  return (
    <>
    {chats?.map(chat=>(
      <div key={chat._id} 
     className="bg-cyan-500/10 p-4 m-2 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
     onClick={()=>setSelectedUser(chat)}
      >
         <div className="flex   items-center gap-3">
          <div className={` avatar-${onlineUsers.includes(chat._id) ? "online" : "offline"}`}></div>
              <div className="size-15  rounded-full">
                <img className='' src={chat.avatar || "/avatar.png"} alt={chat.fullName} />
              </div>
            <h4 className="text-slate-200 pl-5 font-medium truncate">{chat.fullName}</h4>
            </div>
          </div>
     
    ))}
    </>
  )
}

export default ChatList