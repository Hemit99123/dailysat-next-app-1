"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Element from "@/components/features/Dashboard/Element";

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
      <div className="p-5 flex flex-col lg:flex-row justify-between items-center space-y-5 lg:space-y-0 lg:space-x-10">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-800">{greeting == "" ? "Loading greeting..." : greeting}</h1>
          <p className="text-gray-500 mt-2">Welcome to DailySAT! Let&apos;s continue your SAT journey, imporved!</p>
        </div>
        <div className="flex space-x-3 justify-center lg:justify-start">
          <button 
            className="border px-10 py-2 bg-white font-bold hover:bg-gray-100 transition-colors"
            onClick={() => handleRedirect("/referral")}
          >
            Referral 
          </button>
          <button className="border px-10 py-2 bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors">
            something
          </button>
        </div>
      </div>
      <div className="flex space-x-2">
        <Element>
          <p>yo</p>
        </Element>
        <Element>
          <p>yo</p>
        </Element>
      </div>

    </div>
  );
};

export default Home;
