import { auth } from "@/auth";
import protectedRoutes from "@/data/protectedRoutes";
import type { NextRequest } from "next/server";
import redirectTo from "../common/redirect";

const handleUserRoutes = async (request: NextRequest) => {
    const session = await auth();
  
    if (!session && protectedRoutes.protectedAuth.includes(request.nextUrl.pathname)) {
      return redirectTo(request, '/unauthorized');
    }
  
    if (session && request.nextUrl.pathname === '/auth') {
      return redirectTo(request, '/');
    }
  
    return null;
};
  
export default handleUserRoutes