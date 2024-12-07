"use client"

import axios from 'axios'
import React from 'react'

const Logout = () => {

    const handleLogout = async () => {
        await axios.post("/api/session/employee/destroy")
    }
  return (
    <div>
        <button onClick={handleLogout}>Logout as an employee</button>
    </div>
  )
}

export default Logout