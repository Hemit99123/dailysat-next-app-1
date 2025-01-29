import SchoolItem from '@/components/features/Schools/SchoolItem';
import React from 'react'
import { CiSearch } from "react-icons/ci";

const Schools = () => {
  return (
    <div>
        <div className="p-10">
            <h1 className="text-5xl font-semibold mb-10">
                Find your <span className="text-blue-500 underline font-bold">school.</span>
            </h1>
            
            <div className="flex justify-between border rounded-full mb-10">
                <div className="ml-10 flex items-center space-x-6 w-full">
                    <CiSearch className="text-4xl"/>
                    <input className="w-full appearance-none outline-none text-lg" placeholder='Search for your school'/>
                </div>

                <button className="bg-blue-500 text-white py-5 px-16 rounded-full font-bold text-lg">Search</button>
            </div>

            <div>
                <h3 className="text-2xl font-semibold mb-9">Partnered Schools:</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 mx-auto lg:gap-16">
                    <SchoolItem 
                        name="Demo"
                        location="Virtual"
                        desc="This is a demo classroom"
                        joined="Jan 29 2025"
                        img='https://saintjamescatholic.school/sites/stjamesschool/files/resize/school_crest-386x424.png'
                    />
                </div>

            </div>
        </div>
    </div>
  )
}

export default Schools