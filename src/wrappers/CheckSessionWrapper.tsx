"use client"

import React from 'react';
import Spinner from '../components/common/Spinner';
import httpService from '@/utils/httpService';
import { useRouter } from 'next/navigation';

const CheckSessionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter()

    const isAuth = async () => {
        const cachedSession = JSON.parse(localStorage.getItem('session') || "");
        const currentTime = Date.now();

        // Check if the cached data is still valid (15 minutes)
        if (currentTime - cachedSession.timestamp < 15 * 60 * 1000) {
            return true; // Return with a true value 
        } else {
            const response = await httpService.get("/auth/check-session");
            const sessionData = response.data.session

            if (response.data.success) {
                const newCachedData = {
                    session: sessionData,
                    timestamp: Date.now(), // Store current time (so we can compare in the future times)
                };
        
                localStorage.setItem('session', JSON.stringify(newCachedData));
                return true
            }
        }
    }

    if (isAuth === null) {
        return <Spinner />;
    }

    if (!isAuth) {
        router.push("/login")
    }

    return <>{children}</>;
};

export default CheckSessionWrapper;
