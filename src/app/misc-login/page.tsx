"use client"

import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { getCookieConsentValue, resetCookieConsentValue } from "react-cookie-consent";
import axios from "axios";
import { AuthResponse, User } from "../signup/page";

export default function Signup() {
  const [purpose, setPurpose] = useState<string>("")
  const [email, setEmail] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [inputFieldText, setInputFieldText] = useState<string>();

  useEffect(() => {
    const searchparams: URLSearchParams = new URL(window.location.href).searchParams;
    setPurpose(searchparams.get("t") || "");
  }, [])

  async function successCallback(token: CredentialResponse) {
    const str: string = token.credential || "";
    const user: User = jwtDecode<User>(str);
    user.currency = 0;
    user.questionsAnswered = [];

    if (getCookieConsentValue("userData") == "true") {
      // get userData
      const userData: AuthResponse = await (await axios.post("/api/auth", user)).data;

      if (userData.code != 200)
        window.alert(userData.message)
      else {
        // Save
        setEmail(userData.user?.email || "");
        setPicture(userData.user?.picture || "");
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

  async function sendReq() {
    if (email == "") {
      window.alert("Login first!");
    }
    else {
      if (purpose == "Referee bonus") {
        await axios.post("/api/referral", {
          email_referred: email,
          id_referee: inputFieldText
        })
        window.location.replace("/");
      }
      else {
        // for now, just the two lmao
        await axios.post("/api/initial-250-auth", {
          email: email
        })
        window.location.replace("/");
      }
    }
  }
  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      >
        <div className="bg-white p-8">
          <div className="flex mb-6">
            <div
              className={`text-center flex-1 py-2 text-blue-600 text-3xl  `}
            >
              {purpose}
              <p className="text-black text-sm">To redeem your points, you must signin to your account again.</p>
              <div className="flex justify-center mt-5">
                {email == "" ? (
                  <GoogleLogin
                    onSuccess={successCallback}
                    onError={() => errorCallback()}
                    //   useOneTap
                    shape="pill"
                    width={500}
                  />
                ) : (
                  <div className="flex items-center w-full justify-center">
                    <img src="/icons/checked.png" className="w-8 h-8 mr-2"></img>
                    <p className="text-xl text-green-500 mr-6">Verified</p>
                    <img src={picture} className="w-12 h-12 rounded-xl" />
                  </div>
                )}

              </div>
            </div>
          </div>

          {purpose == "Referee bonus" && (
            <div className="flex justify-center mb-12 ">
              <h2>Input the Code given to you:</h2>
              <input type="text" className="fancy-input ml-4 -mt-1" onChange={(out) => setInputFieldText(out.target.value || "")} value={inputFieldText}></input>
            </div>
          )}
          <div className="flex justify-center">
            <button
              className="w-[30%] px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => sendReq()}
            >
              Continue
            </button>
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  )
}
