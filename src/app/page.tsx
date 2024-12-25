"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

const Reading = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /reading route
    router.push("/reading");
  }, [router]);

  return null; // Render nothing as the user is being redirected
};

export default Reading;
