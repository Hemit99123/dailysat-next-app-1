'use server'
import { signOut } from "@/auth";

export const handleSignOut = async () => {
        await signOut({redirectTo: "/api/auth/signin"});
};
