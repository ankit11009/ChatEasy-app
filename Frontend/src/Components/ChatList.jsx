import React, { useEffect } from 'react'
import { useChatStore } from '../Store/useChat.js'
import UsersLoadingSkeleton from './UserLoadingSkeleton'
import NoConversationPlaceholder from './NoConversationPlaceholder'
import NoChatsFound from './NoChatsFound'


const ChatList = () => {

  const {getMyChatPartner,chats,isUserLoading,setSelectedUser}=useChatStore()

  //it will get all chat partner 

  useEffect(()=>{getMyChatPartner()},[])
  if(isUserLoading) return <UsersLoadingSkeleton/>
  
  if(chats.lenght===0) return <NoChatsFound/>

  return (
    <>
    {chats?.map(chat=>(
      <div key={chat._id} 
     className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
     onClick={()=>setSelectedUser(chat)}
      >
         <div className="flex items-center gap-3">
          
              <div className="size-12 rounded-full">
                <img src={chat.avatar || "/avatar.png"} alt={chat.fullName} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
          </div>
     
    ))}
    </>
  )
}

export default ChatList