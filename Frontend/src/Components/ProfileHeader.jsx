import React from 'react'
import { useState,useRef } from 'react'
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from '../Store/useAuth';
import { useChatStore } from '../Store/useChat';


  const mouseClickSound= new Audio("/Sounds/mouse-click.mp3")
// const Volume2Icon=new Audio("Sounds/keyStroke1.mp3")

  const ProfileHeader = () => {
  const {logout,authUser,updateProfile}=useAuthStore()
  const {isSoundEnabled,toggleSound}=useChatStore()
  const [selectedImage,setSelectedImage]=useState(null)

  const fileInputRef=useRef(null)

  const handleProfileImageupload=async(e)=>{
   
    const file = e.target.files[0];
    if (file) {
    // 1. For Local Preview (Keep this so the user sees the change immediately)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    // 2. For Backend Upload (Switch to FormData)
    const formData = new FormData();
    formData.append("avatar",file); // Must match the name in your upload.single("avatar") or upload.fields

    try {
      // Pass the formData directly to your updateProfile function
      await updateProfile(formData);
    } catch (error) {
      console.error("Upload failed:", error);
    }

  } else {
    console.log("No file selected");
  }
  }
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        {/*Avatar */}
        <div className='avatar online'>
          <button
          className="size-14 rounded-full overflow-hidden relative group"
          onClick={(e)=>fileInputRef.current.click()}
          >
            <img src={selectedImage || authUser.avatar || "/avatar.png"} alt="User image" 
            className="size-full object-cover"
            />
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
          
          </button>


          <input type="file"
          accept='image/*'
          ref={fileInputRef}
          onChange={handleProfileImageupload}
          className='hidden'
          />
        </div>
        {/*UserNAme & ONLINE TEXT */}
        <div>
          <h3 className="text-slate-200 font-medium text-base max-w-45 truncate">
            {authUser?.fullName}
          </h3>
          <p className="text-slate-400 text-xs">Online</p>
        </div>
      </div>
      {/*Buttons */}
      <div className="flex gap-4 items-center">
        {/*Logout Button */}
        
            <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>
          {/*Sound toggle btn */}
            <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              // play click sound before toggling
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        
      </div>
    </div>
  )
}

export default ProfileHeader