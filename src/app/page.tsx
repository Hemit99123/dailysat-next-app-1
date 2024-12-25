"use client";

import OwnedItem from "@/components/features/Dashboard/OwnedItem";
import { useEffect, useState } from "react";
import Option from "@/components/features/Dashboard/Option";
import CoinDisplay from "@/components/features/Dashboard/CoinDisplay";
import items from "@/data/items";
import axios from "axios";
import Quotes from "@/types/quotes";
import Spinner from "@/components/common/Spinner";

const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState<Quotes | null>(null);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);

  // Fetch a random quote once the component has been mounted
  useEffect(() => {
    const handleFetchQuote = async () => {
      setIsLoadingQuote(true);
      try {
        const response = await axios.get("https://api.realinspire.tech/v1/quotes/random", {
          params: {
            maxLength: 30,
          },
        });

        // Adjust based on API response structure
        if (response.data && response.data.length > 0) {
          setQuote(response.data[0]);
        } else {
          throw new Error("No quotes available");
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
        alert("Something went wrong while retrieving your quote.");
      } finally {
        setIsLoadingQuote(false);
      }
    };

    handleFetchQuote();
  }, []);

  // Determine the greeting based on the time of day
  useEffect(() => {
    const getGreeting = () => {
      const hours = new Date().getHours();
      if (hours < 12) {
        return "Good morning";
      } else if (hours < 18) {
        return "Good afternoon";
      } else {
        return "Good evening";
      }
    };
    setGreeting(getGreeting());
  }, []);

  return (
    <div>
      {/* Greeting Section */}
      <div className="mt-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          {greeting ? `${greeting} :)` : "Loading greeting..."}
        </h1>
        <p className="text-gray-600 font-light">
          Choose what SAT to study and start practicing...
        </p>
      </div>

      {/* CTA Section */}
      <div className="lg:px-16 lg:p-6 px-2">
        <div className="flex space-x-2 mt-px">
          <Option
            svg={
              <svg
                height="30px"
                width="30px"
                viewBox="0 -0.5 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG content */}
              </svg>
            }
            header="Reading"
            redirect="/reading"
          />
          <Option
            svg={
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
              >
                {/* SVG content */}
              </svg>
            }
            header="Math"
            redirect="/math"
          />
        </div>
      </div>

      {/* Explore Section */}
      <div className="flex items-center pl-5 mt-9">
        <svg
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          fill="#1e3a8a"
          height="40px"
          width="40px"
        >
          {/* SVG content */}
        </svg>
        <h1 className="pl-3.5 font-bold text-4xl text-blue-900">Explore!</h1>
      </div>

      <div className="lg:flex lg:space-x-2 mt-1.5 p-3.5">
        <CoinDisplay header="DailySAT Coins:" coins={30} status="downward" percentage={500} />
        <CoinDisplay header="Streaks Coins:" coins={60} status="upward" percentage={20} />
      </div>

      {/* Second row of boxes area */}
      <div className="mt-4 flex flex-col md:flex-row p-3.5 w-full space-y-3 md:space-y-0 md:space-x-3">
        {/* Motivational Quote Section */}
        <div className="w-full md:w-1/3 rounded-lg shadow-lg flex items-center justify-center">
          {isLoadingQuote ? (
            <Spinner />
          ) : quote ? (
            <div className="flex flex-col items-center">
              <svg
                height="45px"
                width="45px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                {/* SVG content */}
              </svg>
              <p className="mt-4 text-gray-700 text-center">{quote.text}</p>
              <span className="text-gray-500 text-sm">- {quote.author || "Unknown"}</span>
            </div>
          ) : (
            <p className="text-gray-500">No quote available at the moment.</p>
          )}
        </div>

        {/* Additional Sections */}
        {/* Add other components or sections here */}
      </div>
    </div>
  );
};

export default Home;
