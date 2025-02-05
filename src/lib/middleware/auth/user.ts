import { auth } from "@/auth";
import protectedRoutes from "@/data/protectedRoutes";
import type { NextRequest } from "next/server";
import redirectTo from "../common/redirect";
import { handleSignIn } from "@/components/common/server-actions";

const handleUserRoutes = async (request: NextRequest) => {
    const session = await auth();
  
    if (!session && protectedRoutes.protectedAuth.includes(request.nextUrl.pathname)) {
      return redirectTo(request, '/api/auth/signin')
    }
  
    if (session && request.nextUrl.pathname === '/auth') {
      return redirectTo(request, '/');
    }
  
    return null;
};
  
export default handleUserRoutes