"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CoinDisplay from "@/components/features/Dashboard/CoinDisplay";
import Option from "@/components/features/Dashboard/Option";

const Home = () => {
  const [greeting, setGreeting] = useState("");
  const router = useRouter()

  // Getting the greeting based on what time of day it is
  useEffect(() => {
    const getGreeting = () => {
      const hours = new Date().getHours();
      if (hours < 12) {
        return "Good morning!";
      } else if (hours < 18) {
        return "Good afternoon!";
      } else {
        return "Good evening!";
      }
    };
    setGreeting(getGreeting());
  }, []);

  const handleRedirect = (url: string) => {
    router.push(url)
  }

  return (
    <div className="bg-gray-50 h-screen">
      <div className="p-7 mp-5 flex flex-col lg:flex-row justify-between items-center space-y-5 lg:space-y-0 lg:space-x-10">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-800">{greeting == "" ? "Loading greeting..." : greeting}</h1>
          <p className="text-gray-500 mt-2">Let&apos;s continue your SAT journey, imporved!</p>
        </div>
        <div className="flex space-x-3 justify-center lg:justify-start">
          <button 
            className="border px-10 py-2 bg-white font-bold hover:bg-gray-100 transition-colors rounded-lg"
            onClick={() => handleRedirect("/referral")}
          >
            Referral 
          </button>
          <button 
            className="border px-10 py-2 bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors rounded-lg"
            onClick={() => handleRedirect("https://evq73w1t59w.typeform.com/to/S0yXIWtD")}
          >
            Contact
          </button>
        </div>
      </div>

      <div>
        {/* CTA to either go to Math SAT or Reading SAT */}

        <div className="px-16 p-6 flex space-x-3">
        <Option
          svg={
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.4207 5.63965H21.7007" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.29956 5.64014H9.57956" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.4207 15.3301H21.7007" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.4207 21.3896H21.7007" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.0894 9.27V2" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.29956 22L9.57956 14.73" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9.57956 22L2.29956 14.73" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          }
          header="Math SAT"
          redirect="/math"
        />

        <Option
          svg={
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.4207 5.63965H21.7007" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.29956 5.64014H9.57956" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.4207 15.3301H21.7007" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.4207 21.3896H21.7007" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.0894 9.27V2" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.29956 22L9.57956 14.73" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9.57956 22L2.29956 14.73" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          }
          header="Reading SAT"
          redirect="/reading"
        />
        </div>
      </div>
      <div className="lg:flex lg:space-x-2 mt-1.5 p-3.5">

        {/* amountChange prop needs to have a percentage NOT the amount */}

        <CoinDisplay 
          header="DailySAT Coins:" 
          coins={30} 
          status="downward" 
          amountChange={500}
        />
        <CoinDisplay 
          header="Streaks Coins:" 
          coins={60} 
          status="upward" 
          amountChange={20}
        />
      </div>

    </div>
  );
};

export default Home;
