'use server'
import { signIn } from "@/auth";

export const handleSignIn = async () => {
        // Sign in the user
        await signIn("google");
};
