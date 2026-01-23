import React from 'react'
import { useAuthStore } from '../Store/useAuth'
import { useState } from 'react'
import BorderAnimatedContainer from "../Components/BorderAnimatedContainer"
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react"; 


const SignUpPage = () => {

const [formData,setFormData]=useState({fullName:"",email:"",password:""})

const{signUp,isSignUp}=useAuthStore()

const handleSubmit=(e)=>{

}

  return (
  <div className="w-full flex items-center justify-center p-4 bg-slate-900">
    <div className="relative w-full max-w-6xl md:h-200 h-162.5">
    <BorderAnimatedContainer>
    <div className="w-full flex flex-col md:flex-row">
        {/*Left side */}
        <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
            <div className="w-full max-w-md">
                {/*HEading TExt */}
                <div>
                    <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4"/>
                    <h2 className="text-2xl font-bold text-slate-200 mb-2">Create Account</h2>
                    <p className="text-slate-400">Signup for new account</p>
                </div>
                {/*Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className='auth-input-label'>Full Name</label>
                        <div className='relative'>
                            <UserIcon className='auth-input-icon'/>
                            <input type="text"
                            value={formData.fullName}
                            onChange={(e)=> setFormData({...formData,fullName:e.target.value})}
                            className='input'
                            placeholder='Full name'
                            />
                        </div>
                    </div>
                </form>

            </div>
        </div>
        {/*RIght side */}
       
    </div>
    </BorderAnimatedContainer>
    </div>
  </div>
  )
}

export default SignUpPage