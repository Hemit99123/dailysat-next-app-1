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
            <svg height="100px" width="100px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <polygon className="st0" points="239.266,387.893 212.245,371.584 212.245,512 299.755,512 299.755,364.066 289.468,358.608" />
                  <polygon className="st0" points="316.489,512 403.991,512 403.991,419.375 316.489,372.948" />
                  <polygon className="st0" points="420.725,428.257 420.725,512 494.459,512 494.459,467.379" />
                  <polygon className="st0" points="108.009,512 195.511,512 195.511,361.476 108.009,308.643" />
                  <polygon className="st0" points="17.541,512 91.275,512 91.275,298.536 17.541,254.021" />
                  <path className="st0" d="M228.325,77.514c21.358-1.986,37.071-20.918,35.077-42.276c-1.977-21.343-20.901-37.048-42.267-35.07 c-21.343,1.978-37.055,20.902-35.07,42.268C188.043,63.787,206.959,79.491,228.325,77.514z" />
                  <path className="st0" d="M359.999,310.898l-18.548-61.044c-0.76,1.324-1.528,2.648-2.402,3.906 c-8.49,12.208-21.841,20.003-36.646,21.368l-6.824,0.465l19.448,47.162c4.126,6.831,9.224,13.025,15.14,18.393l50.57,45.92 c7.133,6.202,17.919,5.614,24.349-1.332l0.458-0.474c6.406-6.928,6.177-17.681-0.498-24.333L359.999,310.898z" />
                  <polygon className="st0" points="231.324,123.336 244.266,128.532 248.107,114.38 240.115,100.777 224.861,112.314" />
                  <path className="st0" d="M225.996,350.601l0.687-0.164c9.168-2.272,14.977-11.275,13.253-20.541l-11.137-59.762l73.456-5.099 c10.541-0.736,20.199-6.21,26.229-14.888c6.038-8.694,7.795-19.643,4.813-29.79l-2.762-9.356l-22.968-83.662l39.375,2.124 l31.474,30.322c-1.52,1.855-2.28,4.282-1.667,6.798l2.574,10.418l-18.303,4.519c-4.33,1.054-6.97,5.434-5.899,9.764l12.321,49.998 c1.078,4.339,5.45,6.978,9.773,5.924l77.656-19.152c4.339-1.079,6.978-5.459,5.908-9.797l-12.33-49.989 c-1.062-4.322-5.442-6.978-9.772-5.924l-18.303,4.518l-2.566-10.402c-1.046-4.224-5.319-6.806-9.552-5.768l-1.912,0.474 c-0.433-1.773-1.218-3.489-2.394-5.025l-30.788-40.372c-3.317-4.347-8.048-7.41-13.367-8.645l-50.636-18.123 c-17.134-6.128-36.05-3.554-50.986,6.618l-4.388,62.311l-40.332-28.238l-28.148,21.596l-45.553-16.44 c-7.141-3.162-15.484-0.122-18.899,6.888l-0.474,0.964c-1.683,3.481-1.929,7.476-0.654,11.112c1.266,3.652,3.947,6.635,7.443,8.318 l54.908,26.212c6.831,3.268,14.781,3.236,21.588-0.082l29.276-19.471l20.084,57.588l-48.592,4.257 c-8.178,0.743-15.623,5.098-20.256,11.88c-4.624,6.781-5.973,15.287-3.685,23.189l24.153,82.598 C207.326,347.471,216.731,352.88,225.996,350.601z" />
                  <path className="st0" d="M410.078,158.062l0.368,0.212l2.566,10.41l-26.318,6.495l-2.492-10.09 c4.886,4.004,11.864,4.306,16.939,0.384l0.294-0.221c2.124-1.643,3.612-3.8,4.461-6.152L410.078,158.062z" />
                  <path className="st0" d="M275.169,198.076 c0.245,2.656-1.692,4.976-4.339,5.237c-2.639,0.229-4.976-1.7-5.237-4.347c-0.238-2.656,1.7-4.992,4.355-5.229 C272.578,193.491,274.924,195.42,275.169,198.076z" />
                  <path className="st0" d="M262.357,167.41c2.631-0.245,4.976,1.684,5.222,4.331 c0.245,2.656-1.7,5.001-4.339,5.238c-2.639,0.237-4.984-1.692-5.221-4.339C257.765,169.992,259.709,167.655,262.357,167.41z" />
                </g>
              </g>
            </svg>
              <p className="mt-4 text-gray-700 text-center text-lg font-semibold">{quote.content}</p>
              <span className="text-gray-500 text-sm">- {quote.author || "Unknown"}</span>
            </div>
          ) : (
            <p className="text-gray-500">No quote available at the moment.</p>
          )}
        </div>

        {/* Owned Items Section */}
        <div className="w-full md:w-2/3 rounded-lg shadow-lg p-4 flex flex-col space-y-3">
          <h2 className="text-lg font-bold text-gray-800">Your Owned Items</h2>
          <div>
            {items.map((item, index) => (
              <OwnedItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
