import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuthStore } from './useAuth'


export const useChatStore= create((set,get)=>({
    allContacts:[],
    chats:[],
    messages:[],
    activeTab:"chats",
    selectedUser:null,
    isUserLoading:false,
    isMessageLoading:false,
    isSoundEnabled:localStorage.getItem("isSoundEnabled")==="true",
    toggleSound:()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled)
        set({isSoundEnabled:!get().isSoundEnabled})
    },
    setActiveTab:(tab)=>set({activeTab:tab}),
    setSelectedUser:(selectedUser)=>set({selectedUser}),

    gettAllContacts:async()=>{
        set({isUserLoading:true})
        try {
            const res=await axiosInstance.get("/message/all-contacts")
            set({allContacts:res.data.data})
        } catch (error) {
            toast.error(error?.response?.data.message)
            
        }finally{
            set({isUserLoading:false})
        }
    },
    getMyChatPartner:async()=>{
        set({isUserLoading:true})
        try {
            const res=await axiosInstance.get("/message/chats")
            set({chats:res.data.data})
        } catch (error) {
            toast.error(error?.response?.data.message)
        }finally{
            set({isUserLoading:false})
        }        
    },
    getMessageByUserId:async(userId)=>{
        set({isMessageLoading:true})
        try {
            const res=await axiosInstance.get(`/message/${userId}`)
            
            
            set({messages:res.data.data})
            
            
        } catch (error) {
            console.log("Error:",error);
            
            toast.error(error?.response?.message?.data)
        }
        finally{
            set({isMessageLoading:false})
        }
    },
    // which ever the user seleceted we are sending that id from selectedUser
    sendMessage:async(messageData)=>{
        const {selectedUser,messages}=get()
        const {authUser}=useAuthStore.getState()

        //optimisation: removing the latency

        const temId=`temp-${Date.now()}`

        const optimisticMessage={
            _id:temId,
            userId:authUser._id,
            receiverId:selectedUser._id,
            text:messageData.text,
            image:messageData.image,
            createdAt:new Date(),
            isOptimistic:true,
        }

        set({messages:[...messages,optimisticMessage]})

        try {
        const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
        
        set({messages:messages.concat(res.data.data)})
        console.log("messages",messages);
        
        } catch (error) {
            //removing optimistic message on failure 
            set({messages:messages})
            toast.error(error?.response?.mesaages?.data || "Something went wrong")
        }
    }
}))