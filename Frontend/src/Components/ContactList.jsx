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
  

  return (
    <>
    {allContacts?.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-3 m-2 rounded-xl cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3  ">
          <div className={`avatar${onlineUsers.includes(contact._id) ? "online" : "offline"}`}></div>
              <div className="size-15 rounded-full ">
                <img className='' src={contact.avatar || "/avatar.png"} alt='contact.fullName' />
              </div>
            <h4 className="text-slate-200 font-medium p-2" >{contact.fullName}</h4>
            </div>
          </div>
        
      ))}
    </>
  )
}

export default ContactList