"use client";

import httpService from '../../utils/httpService';

const Login = () => {
  
  const handleGoogleSignIn = async () => {
    try {
      const response = await httpService.post("/auth/google"); // Adjust the endpoint as necessary

      if (response.status === 200) {
        alert("Successfully logged in with Google!");
        // Add the global user object here (so that user is )
        localStorage.setItem("email", response.data.email)
        const sessionData = response.data.session; // Contains all the session data given back from the login route logic

        const cacheData = {
            session: sessionData,
            timestamp: Date.now(), // Store current time (so we can compare in the future times)
        };

        localStorage.setItem('session', JSON.stringify(cacheData));

      } else {
        throw new Error(response.data.error);
      }
    } catch (error: any) {
      alert(error.response?.data.message || 'An unexpected error occurred');
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-gray-800 text-3xl font-extrabold mb-8 text-center">
              Sign in with Google
            </h3>
            <div className="mt-8">
              <button
                onClick={handleGoogleSignIn}
                className="w-full shadow-xl py-3 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Log in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
