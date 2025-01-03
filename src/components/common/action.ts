'use server'
import { signOut } from "@/auth";

export const handleSignOut = async () => {
        // Sign out the user
        await signOut();
};
