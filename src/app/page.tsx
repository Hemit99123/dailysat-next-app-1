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
  const [quote, setQuote] = useState<Quotes | null>(null)

  // Get the random quote once the component has been mounted and no more after
  // Hence the [] dependency 

  useEffect(() => {
    const handleFetchQuote = async () => {
      try {
        const randomQuote = await axios.get("https://api.realinspire.tech/v1/quotes/random", {
          params: {
            maxLength: 30
          }
        });
        setQuote(randomQuote.data[0]);
      } catch (error) {
        alert("Something went wrong when retrieving your quote :(")
        alert("Error is" + error)
      }
    }
    
    handleFetchQuote()
  }, [])

  // Getting the greeting based on what time of day it is
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
          {greeting === "" ? "Loading greeting..." : greeting + " :)"}
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
              <svg height="30px" width="30px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0" />
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                <g id="SVGRepo_iconCarrier"> 
                  <path
                    d="M13.2942 7.95881C13.5533 7.63559 13.5013 7.16358 13.178 6.90453C12.8548 6.64549 12.3828 6.6975 12.1238 7.02072L13.2942 7.95881ZM6.811 14.8488L7.37903 15.3385C7.38489 15.3317 7.39062 15.3248 7.39623 15.3178L6.811 14.8488ZM6.64 15.2668L5.89146 15.2179L5.8908 15.2321L6.64 15.2668ZM6.5 18.2898L5.7508 18.2551C5.74908 18.2923 5.75013 18.3296 5.75396 18.3667L6.5 18.2898ZM7.287 18.9768L7.31152 19.7264C7.36154 19.7247 7.41126 19.7181 7.45996 19.7065L7.287 18.9768ZM10.287 18.2658L10.46 18.9956L10.4716 18.9927L10.287 18.2658ZM10.672 18.0218L11.2506 18.4991L11.2571 18.491L10.672 18.0218ZM17.2971 10.959C17.5562 10.6358 17.5043 10.1638 17.1812 9.90466C16.8581 9.64552 16.386 9.69742 16.1269 10.0206L17.2971 10.959ZM12.1269 7.02052C11.8678 7.34365 11.9196 7.81568 12.2428 8.07484C12.5659 8.33399 13.0379 8.28213 13.2971 7.95901L12.1269 7.02052ZM14.3 5.50976L14.8851 5.97901C14.8949 5.96672 14.9044 5.95412 14.9135 5.94123L14.3 5.50976ZM15.929 5.18976L16.4088 4.61332C16.3849 4.59344 16.3598 4.57507 16.3337 4.5583L15.929 5.18976ZM18.166 7.05176L18.6968 6.52192C18.6805 6.50561 18.6635 6.49007 18.6458 6.47532L18.166 7.05176ZM18.5029 7.87264L19.2529 7.87676V7.87676L18.5029 7.87264ZM18.157 8.68976L17.632 8.15412C17.6108 8.17496 17.5908 8.19704 17.5721 8.22025L18.157 8.68976ZM16.1271 10.0203C15.8678 10.3433 15.9195 10.8153 16.2425 11.0746C16.5655 11.3339 17.0376 11.2823 17.2969 10.9593L16.1271 10.0203ZM13.4537 7.37862C13.3923 6.96898 13.0105 6.68666 12.6009 6.74805C12.1912 6.80943 11.9089 7.19127 11.9703 7.60091L13.4537 7.37862ZM16.813 11.2329C17.2234 11.1772 17.5109 10.7992 17.4552 10.3888C17.3994 9.97834 17.0215 9.69082 16.611 9.74659L16.813 11.2329ZM12.1238 7.02072L6.22577 14.3797L7.39623 15.3178L13.2942 7.95881L12.1238 7.02072ZM6.24297 14.359C6.03561 14.5995 5.91226 14.9011 5.89159 15.218L7.38841 15.3156C7.38786 15.324 7.38457 15.3321 7.37903 15.3385L6.24297 14.359ZM5.8908 15.2321L5.7508 18.2551L7.2492 18.3245L7.3892 15.3015L5.8908 15.2321ZM5.75396 18.3667C5.83563 19.1586 6.51588 19.7524 7.31152 19.7264L7.26248 18.2272C7.25928 18.2273 7.25771 18.2268 7.25669 18.2264C7.25526 18.2259 7.25337 18.2249 7.25144 18.2232C7.2495 18.2215 7.24825 18.2198 7.24754 18.2185C7.24703 18.2175 7.24637 18.216 7.24604 18.2128L5.75396 18.3667ZM7.45996 19.7065L10.46 18.9955L10.114 17.536L7.11404 18.247L7.45996 19.7065ZM10.4716 18.9927C10.7771 18.9151 11.05 18.7422 11.2506 18.499L10.0934 17.5445C10.0958 17.5417 10.0989 17.5397 10.1024 17.5388L10.4716 18.9927ZM11.2571 18.491L17.2971 10.959L16.1269 10.0206L10.0869 17.5526L11.2571 18.491ZM13.2971 7.95901L14.8851 5.97901L13.7149 5.04052L12.1269 7.02052L13.2971 7.95901ZM14.9135 5.94123C15.0521 5.74411 15.3214 5.6912 15.5243 5.82123L16.3337 4.5583C15.4544 3.99484 14.2873 4.2241 13.6865 5.0783L14.9135 5.94123ZM15.4492 5.7662L17.6862 7.6282L18.6458 6.47532L16.4088 4.61332L15.4492 5.7662ZM17.6352 7.58161C17.7111 7.6577 17.7535 7.761 17.7529 7.86852L19.2529 7.87676C19.2557 7.36905 19.0555 6.88127 18.6968 6.52192L17.6352 7.58161ZM17.7529 7.86852C17.7524 7.97604 17.7088 8.07886 17.632 8.15412L18.682 9.22541C19.0446 8.87002 19.2501 8.38447 19.2529 7.87676L17.7529 7.86852ZM17.5721 8.22025L16.1271 10.0203L17.2969 10.9593L18.7419 9.15928L17.5721 8.22025ZM11.9703 7.60091C12.3196 9.93221 14.4771 11.5503 16.813 11.2329L16.611 9.74659C15.0881 9.95352 13.6815 8.89855 13.4537 7.37862L11.9703 7.60091Z" fill="#0891b2"
                  />
                </g>
              </svg>
            }
            header="Reading"
            redirect="/reading"
          />
          <Option
            svg={
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M14.4207 5.63965H21.7007" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M2.29956 5.64014H9.57956" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14.4207 15.3301H21.7007" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14.4207 21.3896H21.7007" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M18.0894 9.27V2" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M2.29956 22L9.57956 14.73" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M9.57956 22L2.29956 14.73" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>    
            }
            header="Math"
            redirect="/math"
          />
        </div>
      </div>

      {/* The Explore Section - includes stats and other features like learning*/}
      <div className="flex items-center pl-5 mt-9">
        <svg 
          viewBox="0 0 48 48" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="#1e3a8a" 
          height="40px" 
          width="40px"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
          <g id="SVGRepo_iconCarrier"> <title>explore-solid</title> <g id="Layer_2" data-name="Layer 2"> 
            <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> 
          </g> 
          <g id="icons_Q2" data-name="icons Q2">
            <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM34.7,14.7,28,28,14.7,34.7a1.1,1.1,0,0,1-1.4-1.4L20,20l13.3-6.7A1.1,1.1,0,0,1,34.7,14.7ZM24,22a2,2,0,1,0,2,2A2,2,0,0,0,24,22Z" />
            <path d="M24,22a2,2,0,1,0,2,2A2,2,0,0,0,24,22Zm0,0a2,2,0,1,0,2,2A2,2,0,0,0,24,22Z" /> 
          </g>
          </g> 
          </g>
        </svg>
        <h1 className="pl-3.5 font-bold text-4xl text-blue-900">Explore!</h1>
      </div>

      <div className="lg:flex lg:space-x-2 mt-1.5 p-3.5">
        <CoinDisplay
          header="DailySAT Coins:"
          coins={30}
          status="downward"
          percentage={500}
        />
        <CoinDisplay
          header="Streaks Coins:"
          coins={60}
          status="upward"
          percentage={20}
        />
      </div>

      {/* Second row of boxes area */}
      <div className="mt-4 flex flex-col md:flex-row p-3.5 w-full space-y-3 md:space-y-0 md:space-x-3">

        {/* Motivational quote section */}
        <div className="w-full md:w-1/3 rounded-lg shadow-lg flex items-center justify-center">
          {quote !== null ? (
            <div className="flex flex-col items-center">
              <svg 
                height="45px" 
                width="45px" 
                version="1.1" 
                id="_x32_" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 512 512" 
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <polygon className="st0" points="239.266,387.893 212.245,371.584 212.245,512 299.755,512 299.755,364.066 289.468,358.608"></polygon>
                    <polygon className="st0" points="316.489,512 403.991,512 403.991,419.375 316.489,372.948"></polygon>
                    <polygon className="st0" points="420.725,428.257 420.725,512 494.459,512 494.459,467.379"></polygon>
                    <polygon className="st0" points="108.009,512 195.511,512 195.511,361.476 108.009,308.643"></polygon>
                    <polygon className="st0" points="17.541,512 91.275,512 91.275,298.536 17.541,254.021"></polygon>
                    <path 
                      className="st0" 
                      d="M228.325,77.514c21.358-1.986,37.071-20.918,35.077-42.276c-1.977-21.343-20.901-37.048-42.267-35.07 c-21.343,1.978-37.055,20.902-35.07,42.268C188.043,63.787,206.959,79.491,228.325,77.514z"
                    ></path>
                    <path 
                      className="st0" 
                      d="M359.999,310.898l-18.548-61.044c-0.76,1.324-1.528,2.648-2.402,3.906 c-8.49,12.208-21.841,20.003-36.646,21.368l-6.824,0.465l19.448,47.162c4.126,6.831,9.224,13.025,15.14,18.393l50.57,45.92 c7.133,6.202,17.919,5.614,24.349-1.332l0.458-0.474c6.406-6.928,6.177-17.681-0.498-24.333L359.999,310.898z"
                    ></path>
                    <polygon className="st0" points="231.324,123.336 244.266,128.532 248.107,114.38 240.115,100.777 224.861,112.314"></polygon>
                    <path 
                      className="st0" 
                      d="M225.996,350.601l0.687-0.164c9.168-2.272,14.977-11.275,13.253-20.541l-11.137-59.762l73.456-5.099 c10.541-0.736,20.199-6.21,26.229-14.888c6.038-8.694,7.795-19.643,4.813-29.79l-2.762-9.356l-22.968-83.662l39.375,2.124 l31.474,30.322c-1.52,1.855-2.28,4.282-1.667,6.798l2.574,10.418l-18.303,4.519c-4.33,1.054-6.97,5.434-5.899,9.764l12.321,49.998 c1.078,4.339,5.45,6.978,9.773,5.924l77.656-19.152c4.339-1.079,6.978-5.459,5.908-9.797l-12.33-49.989 c-1.062-4.322-5.442-6.978-9.772-5.924l-18.303,4.518l-2.566-10.402c-1.046-4.224-5.319-6.806-9.552-5.768l-1.912,0.474 c-0.433-1.773-1.218-3.489-2.394-5.025l-30.788-40.372c-3.317-4.347-8.048-7.41-13.367-8.645l-50.636-18.123 c-17.134-6.128-36.05-3.554-50.986,6.618l-4.388,62.311l-40.332-28.238l-28.148,21.596l-45.553-16.44 c-7.141-3.162-15.484-0.122-18.899,6.888l-0.474,0.964c-1.683,3.481-1.929,7.476-0.654,11.112c1.266,3.652,3.947,6.635,7.443,8.318 l54.908,26.212c6.831,3.268,14.781,3.236,21.588-0.082l29.276-19.471l20.084,57.588l-48.592,4.257 c-8.178,0.743-15.623,5.098-20.256,11.88c-4.624,6.781-5.973,15.287-3.685,23.189l24.153,82.598 C207.326,347.471,216.731,352.88,225.996,350.601z"
                    ></path>
                  </g>
                </g>
              </svg>
              <p className="text-2xl font-semibold text-blue-900">{quote.content}</p>
              <p className="text-gray-500">- {quote.author}</p>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          )}
        </div>


        {/* Items List */}
        <div className="w-full md:w-2/3 rounded-lg shadow-lg p-5 max-h-80 overflow-y-auto">
          <div>
            <p className="font-bold text-xl text-gray-700">Your Items:</p>
            <p className="text-gray-500 text-sm">
              These are the items that you own from your grind...
            </p>
            <hr className="h-px bg-gray-300 border-0" />
          </div>
          {items.map((item, index) => (
            <OwnedItem
              key={index}
              url={item.url}
              name={item.name}
              category={item.category}
              worth={item.worth}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
