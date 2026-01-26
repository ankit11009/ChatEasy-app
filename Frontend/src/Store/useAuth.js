import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { LogOut } from 'lucide-react'


export const useAuthStore=create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLogingUp:false,



    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check")
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in authCheck:",error);
            set({authUser:null})
        } finally{
            set({isCheckingAuth:false})
        }
    },
    signUp:async(data)=>{
        isSigningUp:true
        try {
            const res= await  axiosInstance.post("/auth/signUp",data)
            console.log("res:",res);
            
            set({authUser:res.data})
            // hot toast
            toast.success("Account created successfully!")

        }catch (error) {
            console.log("Error",error);
           toast.error(error.response?.data?.message)

            
        }finally{
            set({isSigningUp:false})
        }
    },
    login:async(data)=>{
        isSigningUp:true
        try {
            const res=await axiosInstance.post("/auth/login",data)
            console.log("Login response:",res);

            set({authUser:res.data.data.existedUser})

            toast.success("Login successfully")
            
        } catch (error) {
            console.log(error);
            toast.error(error.response?.message?.data)
            
        }finally{
            set({isSLogingUp:false})
        }
    },
    logout:async(data)=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("Logout successfully")
        } catch (error) {
            toast.error("Logging out")
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
    }
}))