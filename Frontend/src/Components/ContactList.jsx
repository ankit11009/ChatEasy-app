import React, { useEffect } from 'react'
import { useChatStore } from '../Store/useChat.js'
import UsersLoadingSkeleton from './UserLoadingSkeleton'

const ContactList = () => {

  const {gettAllContacts,allContacts,isUserLoading,setSelectedUser}=useChatStore()

  useEffect(()=>{
    gettAllContacts()
  },[gettAllContacts])

  if(isUserLoading) return <UsersLoadingSkeleton/>
  

  return (
    <>
    {allContacts?.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
         
              <div className="size-12 rounded-full">
                <img src={contact.avatar || "/avatar.png"} alt='contact.fullName' />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
          </div>
        
      ))}
    </>
  )
}

export default ContactList