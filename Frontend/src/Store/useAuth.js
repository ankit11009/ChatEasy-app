import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { io } from "socket.io-client";
import { connectSocket, disconnectSocket } from "../services/socket1.js"






export const useAuthStore=create((set,get)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingIn:false,
   
    onlineUsers:[], 


    checkAuth: async () => {
        set({ isCheckingAuth: true });
    try {
    const res = await axiosInstance.get("/auth/check");
    const user = res.data.data || res.data;


    set({authUser: user });

    const token = localStorage.getItem("accessToken");
    if (token) {
      connectSocket(token, (users) => {
        set({ onlineUsers: users });
      });
    }
  } catch (error) {
   
  } finally {
    set({ isCheckingAuth: false });
  }
},
    login:async(data)=>{
        set({ isLoggingIn: true });
        try {
            const res=await axiosInstance.post("/auth/login",data)
            console.log("Login response:",res);

             const { existedUser, accessToken } = res.data.data;

      localStorage.setItem("accessToken", accessToken);
      set({ authUser: existedUser });

      connectSocket(accessToken, (users) => {
        set({ onlineUsers: users });
      });

            toast.success("Login successfully")
           

          
            
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)
            
        }finally{
            set({isLoggingIn:false})
        }
    },
    logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } finally {
      localStorage.removeItem("accessToken");
      disconnectSocket();
      set({ authUser: null, onlineUsers: [] });
      toast.success("Logged out");
    }
  },
    updateProfile:async(data)=>{
        try {
            const res=await axiosInstance.patch("/auth/update-avatar",data)
            set({authUser:res.data.existedUser})
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error(error?.response?.data.message)
        }
    },

   
   
}))