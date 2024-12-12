"use client";

import { useState, useEffect } from "react";

const Home = () => {
  const [greeting, setGreeting] = useState("");

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

  return (
    <div>
      <h1>{greeting}</h1>
    </div>
  )
}

export default Home;
