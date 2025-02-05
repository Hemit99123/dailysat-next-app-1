import { auth } from "@/auth";
import protectedRoutes from "@/data/protected-routes/protectedUserRoutes";
import type { NextRequest } from "next/server";
import redirectTo from "../common/redirect";

const handleSignInRoutes = async (request: NextRequest) => {
    const session = await auth();
  
    if (!session && protectedRoutes.protectedAuth.includes(request.nextUrl.pathname)) {
      return redirectTo(request, '/auth/signin')
    }
  
    return null;
};
  
export default handleSignInRoutes