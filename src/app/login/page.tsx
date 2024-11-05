"use client";

import { useGoogleLogin } from '@react-oauth/google';
import httpService from '@/utils/httpService';

const Login = () => {

  
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const response = await httpService.get(`/auth/login?access_token=${codeResponse.access_token}`);

      if (response.data.error == "already-authenticated") {
        alert("You are already logged in, you can't log in again!")
      }
    },
    onError: (error) => console.log('Login Failed:', error)
  });
  
  const handleLoginClick = () => {
    login(); // Call the login function without parameters (to get rid of type error from typescript)
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-gray-800 text-3xl font-extrabold mb-8 text-center">
            Sign in with Google
          </h3>
          <button onClick={handleLoginClick}>Login with Google</button>      
        </div>
      </div>
    </div>
  );
};

export default Login;
