import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
import { getSession as getEmployeeSession } from '@/lib/employee-auth/employeeSession';
import protectedRoutes from "@/data/protectedRoutes";
import redirectTo from "../common/redirect";

const handleEmployeeRoutes = async (request: NextRequest) => {
    const isSessionValid = await getEmployeeSession();
  
    if (protectedRoutes.protectedEmployeeBackend.includes(request.nextUrl.pathname)) {
      if (!isSessionValid) {
        return NextResponse.json({
          error: 'You do not have the proper employee authorization',
        });
      }
    }
  
    if (protectedRoutes.protectedEmployeeFrontend.includes(request.nextUrl.pathname)) {
      if (!isSessionValid) {
        return redirectTo(request, '/unauthorized');
      }
    }
  
    if (request.nextUrl.pathname === '/employee-authorize') {
      return isSessionValid ? redirectTo(request, '/employee-authorize/logout') : null;
    }
  
    if (request.nextUrl.pathname === '/employee-authorize/logout') {
      return !isSessionValid ? redirectTo(request, '/employee-authorize') : null;
    }
  
    return null;
};

export default handleEmployeeRoutes