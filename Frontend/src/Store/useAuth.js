import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
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
signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            
            // Assuming your backend returns data in a similar structure to login
            if (res?.data?.data) {
                const { newUser, accessToken } = res.data.data;

                localStorage.setItem("accessToken", accessToken);
                set({ authUser: newUser });

                connectSocket(accessToken, (users) => {
                    set({ onlineUsers: users });
                });
                
                toast.success("Account created successfully!");
            } else {
                // Handle cases where the backend structure might differ
                set({ authUser: res.data });
                toast.success("Account created successfully!");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            const message = error.response?.data?.message || "Signup failed. Please try again.";
            toast.error(message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
    set({ isLoggingIn: true });
    try {
        const res = await axiosInstance.post("/auth/login", data);
        
        
        if (res?.data?.data) {
            const { existedUser, accessToken } = res.data.data;

            localStorage.setItem("accessToken", accessToken);
            set({ authUser: existedUser });

            connectSocket(accessToken, (users) => {
                set({ onlineUsers: users });
            });
            toast.success("Login successfully");
        }
    } catch (error) {
        console.error("Login Error:", error);
        // Safely access error message
        const message = error.response?.data?.message || "Network Error: Check your connection";
        toast.error(message);
    } finally {
        set({ isLoggingIn: false });
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