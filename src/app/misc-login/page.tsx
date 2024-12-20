"use client"

import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { getCookieConsentValue, resetCookieConsentValue } from "react-cookie-consent";
import axios from "axios";
import useUserStore, { useLoggedInStore } from "@/store/user";
import { AuthResponse, User } from "../signup/page";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";


export default function Signup() {
  async function successCallback(token: CredentialResponse) {
    const str: string = token.credential || "";
    const user: User = jwtDecode<User>(str);
    user.currency = 0;
    user.questionsAnswered = [];
    const searchparams : ReadonlyURLSearchParams = useSearchParams();
    const purpose = searchparams.get("t");

    if (getCookieConsentValue("userData") == "true") {
      // get userData
      const userData: AuthResponse = await (await axios.post("/api/auth", user)).data;

      if (userData.code != 200)
        window.alert(userData.message)
      else {
        // Save
        document.cookie = JSON.stringify({ "user": userData.user, "jwt": JSON.stringify(userData.user) });
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
        <div className="bg-white p-8">
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 text-blue-600 text-3xl border-b-2 border-blue-600'`}
            >
              Login for {}

              <div className="flex justify-center mt-5">
                <GoogleLogin
                  onSuccess={successCallback}
                  onError={() => errorCallback()}
                  //   useOneTap
                  shape="pill"
                  width={500}
                />
              </div>
            </button>
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
