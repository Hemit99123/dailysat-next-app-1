import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession as getEmployeeSession } from './lib/employeeSession';

export const middleware = async (request: NextRequest) => {
  const protectedEmployeeBackendRoutes = [
    '/contact',
  ];

  // Check if the request path matches any protected route for backend (ONLY EMPLOYEES ALLOWED)
  const isProtectedEmployeeBackend = protectedEmployeeBackendRoutes.includes(request.nextUrl.pathname);

  if (isProtectedEmployeeBackend) {
    const isSessionValid = await getEmployeeSession();

    if (!isSessionValid) {
      return Response.json({
        error: "You do not have the proper employee authorization"
      })
    }
  }

  // Allow request to proceed if no matching route is found
  return NextResponse.next();
};
