"use client"

import { handleSignIn } from './action'
import React from 'react'
import GoogleButton from 'react-google-button'

const page = () => {


  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='text-blue-800 font-bold text-4xl mb-10'>Sign in</h1>
      <GoogleButton 
        onClick={() => handleSignIn()}
      />
    </div>
  )
}

export default page