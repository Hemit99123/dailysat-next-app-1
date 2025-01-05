'use server'
import { signOut, signIn } from "@/auth";

export const handleSignIn = async () => { 
        await signIn("google", {redirectTo: "/"})
}

export const handleSignOut = async () => {
        await signOut({redirectTo: "/unauthorized"});
};
