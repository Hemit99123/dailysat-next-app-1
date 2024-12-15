"use client"

import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { getCookieConsentValue, resetCookieConsentValue } from "react-cookie-consent";
import { QuestionData } from "../r-w/page";
import axios from "axios";
import useUserStore, { useLoggedInStore } from "@/store/user";

export interface User {
  // MongoDB string 
  _id? : string,
  id: string,
  email: string,
  name: string,
  picture: string,

  // Given name is the first name
  given_name: string,

  // Currency
  currency: number,

  // Questions answered
  questionsAnswered: QuestionData[]
}

// Endstate of API request
export type AuthCode = "login" | "signup";

// The type of the return data
export interface AuthResponse {
  user?: User,
  code?: number,
  message?: string,
  status?: AuthCode,
  ts?: string
}

export default function Signup() {
  async function successCallback(token: CredentialResponse) {
    const str: string = token.credential || "";
    const user: User = jwtDecode<User>(str);

    if (getCookieConsentValue("userData") == "true") {
      // get userData
      const userData: AuthResponse = await (await axios.post("/api/auth", user)).data;

      if (userData.code != 200)
        window.alert(userData.message)
      else {
        // Save
        document.cookie = JSON.stringify({ "user": userData.user, "jwt": userData.ts });
        useUserStore.setState({ user: userData });
        useLoggedInStore.setState({ loggedIn: true });

        // TODO : Redirect to dashboard
        window.location.replace("/");
      }
    }

    else {
      // Alert
      window.alert("Enable the cookies, or else we won't be able to create an account!");
    }
  }

  function errorCallback() {
    // TO DO : Toast system
    alert("You have to enable the cookies to signup!");
    resetCookieConsentValue();
  }

  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 text-blue-600 border-b-2 border-blue-600'`}
            >
              Sign Up

              <GoogleLogin
                onSuccess={successCallback}
                onError={() => errorCallback()}
              //   useOneTap
              />
            </button>
          </div>
        </div>
        {/* TO DO : Actual UI */}

        ;
      </GoogleOAuthProvider>
      </div>
  );
}
