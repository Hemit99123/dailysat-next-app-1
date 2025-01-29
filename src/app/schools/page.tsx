"use client"

import SchoolItem from '@/components/features/Schools/SchoolItem';
import { SchoolItemProps } from '@/types/schoolitem';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";

const Schools = () => {
    const [schools, setSchools] = useState<SchoolItemProps[]>([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const handleGetSchools = async () => {
            const response = await axios.get("/api/schools")

            // Update state with the fetched schools
            setSchools(response.data.schools)
        }

        handleGetSchools()
    }, [])

    const handleSearchSchool = async () => {
        const response = await axios.get(`/api/schools/search?query=${search}`)

        setSchools(response.data.schools)
    }
    
  return (
    <div>
        <div className="p-10">
            <h1 className="text-3xl lg:text-5xl font-semibold mb-10">
                Find your <span className="text-blue-500 underline font-bold">school.</span>
            </h1>
            
            {/* Search bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between sm:border sm:rounded-full mb-10 p-2 sm:p-0">
                <div className="flex items-center space-x-4 sm:space-x-6 w-full px-4 sm:px-10">
                    <CiSearch className="text-2xl sm:text-4xl" />
                    <input 
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full appearance-none outline-none text-base sm:text-lg bg-transparent" 
                        placeholder="Search for your school" 
                    />
                </div>

                <button onClick={handleSearchSchool} className="bg-blue-500 text-white py-3 sm:py-5 px-8 sm:px-16 rounded-full font-bold text-base sm:text-lg mt-4 sm:mt-0">
                    Search
                </button>
            </div>

            <div>
                <h3 className="text-lg lg:text-2xl font-semibold mb-9 text-blue-900">Partnered Schools:</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 mx-auto lg:gap-16">
                    {/* Map through schools to dynamically create SchoolItem components */}
                    {schools.map((school) => (
                        <SchoolItem 
                            _id={school._id}
                            key={school.name} // or any unique field
                            name={school.name}
                            location={school.location}
                            desc={school.desc}
                            joined={school.joined}
                            img={school.img}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Schools
