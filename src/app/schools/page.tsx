import React from 'react'
import Image from 'next/image'
const Schools = () => {
  return (
    <div>
        <div className="p-10">
            <h1 className="text-5xl font-semibold mb-10">
                Find your <span className="text-blue-500 underline font-bold">school.</span>
            </h1>
            
            <div className="flex justify-between border rounded-full">
                <input className="ml-10 w-full"/>
                <button className="bg-blue-500 text-white py-5 px-16 rounded-full font-bold text-lg">Search</button>
            </div>

        </div>
    </div>
  )
}

export default Schools