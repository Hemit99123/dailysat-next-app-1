"use client";

import React, { useState } from "react";
import axios from "axios";

export interface User {
  _id?: string;
  id?: string;
  email?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  currency?: number;
  questionsAnswered?: [];
}

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);

    try {
      // Call the login API
      const loginResponse = await axios.post("/api/auth/login");
      const loginData = loginResponse.data;

      if (loginData.state === "new_doc") {
        // User not found, prompt for additional details
        const username = prompt("Enter your username:");
        const birthday = prompt("Enter your birthday (YYYY-MM-DD):");

        if (username && birthday) {
          // Call the create document API
          await axios.post("/api/auth/create", {
            email: loginResponse.data.email,
            username,
            birthday,
          });

        } else {
          alert("Username and birthday are required to create an account.");
        }
      } else if (loginData.code === 200) {
        // Existing user login
        alert("Login successful!");

      } else {
        alert(loginData.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during the login process.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleError() {
    alert("An error occurred during the authentication process. Please try again.");
  }

  return (
    <div className="signup-container">
      <button onClick={handleLogin}>
        Sign in with google
      </button>
    </div>
  );
}
