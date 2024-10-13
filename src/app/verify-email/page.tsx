"use client"

import { useState } from "react";
import httpService from "../../utils/httpService";
import { useRouter } from "next/navigation";

const VerifyEmail = () => {
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
    const router = useRouter();
    
    const handleVerificationCodeChange = (index: number, value: string) => {
        // Update the verification code array with the new value at the specified index
        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = value.slice(0, 1); // Ensure only one character is allowed
        setVerificationCode(newVerificationCode);
    };

    const handleVerficationUserAccount = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await httpService.post("/auth/verify", {
                email,
                code: verificationCode.join("")
            })

            if (response.status !== 200) {
                throw new Error(response.data.message)
            } else {
                alert('Verified account sucessfully!')
            }
        } catch(err: any) {
            alert(err.response?.data.message)
        }
    }

    return (
        <div className="flex items-center justify-center mt-60">
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded">
                <h1 className="text-2xl mb-6 text-center font-bold">Verify your email</h1>

                <form onSubmit={handleVerficationUserAccount} className="flex flex-col w-full">
                    <label className="mb-2 font-semibold">Email:</label>
                    <input 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="border p-2 mb-4 rounded"
                        value={email}
                    />
                    <label className="mb-2 font-semibold">Verification:</label>
                    <div className="flex space-x-4">
                        {verificationCode.map((digit, index) => (
                            <input 
                                key={index}
                                type="text"
                                maxLength={1}
                                onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                                className="border p-2 mb-4 rounded w-16 text-center"
                                value={digit}
                            />
                        ))}
                    </div>
                    <button 
                        type="submit" 
                        className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
                    >
                        Verify
                    </button>
                    <hr className="my-3"/>

                    <span>
                        Generate a new code <span className="text-violet-700 cursor-pointer" onClick={() => router.push("/generate-code")}>here</span>
                    </span>

                    <span>
                        Go to login <span className="text-blue-700 cursor-pointer" onClick={() => router.push("/login")}>here</span>
                    </span> 
                </form>
            </div>
        </div>
    );
}

export default VerifyEmail;
