"use client";

import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
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

  async function handleLogin(token: CredentialResponse) {
    setIsLoading(true);

    try {
      const str: string = token.credential || "";
      const decodedUser: User = jwtDecode<User>(str);

      const email = decodedUser.email;
      if (!email) {
        alert("Failed to retrieve email from Google OAuth. Please try again.");
        return;
      }

      // Call the login API
      const loginResponse = await axios.post("/api/auth/login", { email });
      const loginData = loginResponse.data;

      if (loginData.state === "new_doc") {
        // User not found, prompt for additional details
        const username = prompt("Enter your username:");
        const birthday = prompt("Enter your birthday (YYYY-MM-DD):");

        if (username && birthday) {
          // Call the create document API
          await axios.post("/api/auth/create", {
            email,
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
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
        <div className="bg-white p-8">
          <div className="flex mb-6">
            <button className="flex-1 py-2 text-blue-600 text-4xl font-bold" disabled={isLoading}>
              Sign In
            </button>
          </div>
          <div className="flex justify-center mt-10">
            <GoogleLogin
              onSuccess={handleLogin}
              onError={handleError}
              shape="pill"
              width={500}
            />
          </div>
          {isLoading && <p className="text-center mt-4">Processing...</p>}
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
