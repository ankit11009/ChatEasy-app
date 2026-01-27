import React from 'react'
import BorderAnimatedContainer from '../Components/BorderAnimatedContainer'
import { useChatStore } from '../Store/useChat.js'
import ProfileHeader from '../Components/ProfileHeader'
import ActiveTabSwitch from '../Components/ActiveTabSwitch'
import ContactList from '../Components/ContactList'
import NoConversationPlaceholder from "../Components/NoConversationPlaceholder"
import ChatList from "../Components/ChatList.jsx"

const ChatPage = () => {
    const {activeTab,selectedUser} = useChatStore()
    
  return (
    <div className="relative w-full max-w-6xl h-200" >
      {/*LEft Side  */}
      <BorderAnimatedContainer>
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />

          <div>
            {activeTab==="chats"?<ChatList/>:<ContactList/>}
          </div>
        </div>
      {/*Right side  */}
      <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
      {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}

      </div>

      </BorderAnimatedContainer>
    </div>
  )
}

export default ChatPage