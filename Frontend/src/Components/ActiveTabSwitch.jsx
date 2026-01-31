import React from 'react'
import { useChatStore } from '../Store/useChat.js'
import { useState } from 'react'

const ActiveTabSwitch = () => {
const {activeTab,setActiveTab}=useChatStore()
  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2">
      <button onClick={()=>setActiveTab("chats")}
       className={`text-xl w-[50%] tab ${
          activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400 rounded-xl" : "text-slate-400"
        }`}
      >Chats</button>
      <button onClick={()=>setActiveTab("contacts")}
         className={`w-[50%] text-xl tab ${
          activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400 rounded-xl" : "text-slate-400"
        }`}
        >Contacts</button>
    </div>
  )
}

export default ActiveTabSwitch