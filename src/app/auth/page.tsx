"use client"

import axios from 'axios'
import { handleSignIn } from './action'
import React from 'react'
import GoogleButton from 'react-google-button'

const page = () => {

  const handleSignInFlow = async () => {
    handleSignIn()
    await axios.post("api/auth/verify-user")
  }
  return (
    <div className='flex flex-col items-center h-screen justify-center'>
      <h1 className='text-blue-800 font-bold text-4xl mb-10'>Sign in</h1>
      <GoogleButton 
        onClick={handleSignInFlow}
      />
    </div>
  )
}

export default page