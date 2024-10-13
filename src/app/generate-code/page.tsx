"use client"

import { useState } from "react";
import httpService from "../../utils/httpService";
import { useRouter } from "next/navigation";

const GenerateCode = () => {
    const [email, setEmail] = useState("");
    const [type, setType] = useState<string>("reset");
    const router = useRouter();

    const handleVerficationUserAccount = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await httpService.post(`/auth/generate-code`, {
                email,
                type
            });

            if (response.status !== 200) {
                throw new Error(response.data.message);
            } else {
                alert('Verified account successfully!');
            }
        } catch (err: any) {
            alert(err.response?.data.message || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center mt-60">
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded">
                <h1 className="text-2xl mb-6 text-center font-bold">Generate Code</h1>

                <form onSubmit={handleVerficationUserAccount} className="flex flex-col w-full">
                    <label htmlFor="email" className="mb-2 font-semibold">Email:</label>
                    <input
                        id="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 mb-4 rounded"
                        value={email}
                    />
                    
                    <label htmlFor="type" className="mb-2 font-semibold">Type of code:</label>
                    <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border p-2 mb-4 rounded"
            >
                <option value="reset">Reset</option>
                <option value="verify">Verify</option>
            </select>

                    <button
                        type="submit"
                        className="bg-black text-white font-semibold p-2 rounded duration-500 hover:bg-purple-700"
                    >
                        Generate a new code
                    </button>
                    <hr className="my-4"/>
                    <span className="text-gray-500">
                        Verify your email here, <span className="text-blue-600 cursor-pointer" onClick={() => router.push("/verify-email")}>here</span>
                    </span>
                    <span className="text-gray-500">
                        Forgot password here, <span className="text-blue-600 cursor-pointer" onClick={() => router.push("/forgot-password")}>here</span>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default GenerateCode;
