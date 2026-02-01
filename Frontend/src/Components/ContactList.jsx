import React, { useEffect } from 'react'
import { useChatStore } from '../Store/useChat.js'
import UsersLoadingSkeleton from './UserLoadingSkeleton'
import { useAuthStore } from '../Store/useAuth.js'

const ContactList = () => {

  const {gettAllContacts,allContacts,isUserLoading,setSelectedUser}=useChatStore()
  const {onlineUsers}=useAuthStore()

  useEffect(()=>{
    gettAllContacts()
  },[gettAllContacts])

  if(isUserLoading) return <UsersLoadingSkeleton/>
  
if (!allContacts || allContacts.length === 0) {
  return <div className="p-4 text-slate-400 text-center">No contacts found</div>;
}

  return (
    <>
    {allContacts?.map((contact) => (
  <div
    key={contact._id}
    className="bg-cyan-500/10 p-3 m-2 rounded-xl cursor-pointer hover:bg-cyan-500/20 transition-colors"
    onClick={() => setSelectedUser(contact)}
  >
    <div className="flex items-center gap-3">
      {/* WRAP the image inside this div */}
      <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
        <div className="w-12 rounded-full">
          <img src={contact.avatar || "/avatar.png"} alt={contact.fullName} />
        </div>
      </div>
      <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
    </div>
  </div>
))}
    </>
  )
}

export default ContactList