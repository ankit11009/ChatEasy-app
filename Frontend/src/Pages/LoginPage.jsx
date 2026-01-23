import React from 'react'
import { useAuthStore } from '../Store/useAuth.js'

const LoginPage = () => {
    
     const {authUser,isLoggedIn,login}=useAuthStore()
  return (
    <div>
        
    </div>
  )
}

export default LoginPage 