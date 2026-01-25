import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'


export const useChatStore= create((set,get)=>({
    allContacts:[],
    chats:[],
    messages:[],
    activeTab:"chats",
    selectedUSer:null,
    isUserLoading:false,
    isMessageLoading:false,
    isSoundEnabled:localStorage.getItem("isSoundEnabled")==="true",
    toggleSound:()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled)
        set({isSoundEnabled:!get().isSoundEnabled})
    },
    setActiveTab:(tab)=>set({setActiveTab:tab}),
    setSelectedUser:(selectedUser)=>set({selectedUser}),

    gettAllContacts:async()=>{
        set({isUserLoading:true})
        try {
            const res=await axiosInstance.get("/message/allContacts")
            set({allContacts:res.data})
        } catch (error) {
            toast.error(error?.response?.data.message)
            
        }finally{
            set({isUserLoading:true})
        }
    },
    getMyChatPartner:async()=>{
        set({isUserLoading:true})
        try {
            const res=await axiosInstance.get("/message/chats")
            set({chats:res.data})
        } catch (error) {
            toast.error(error?.response?.data.message)
        }finally{
            set({isUserLoading:false})
        }        
    },
}))