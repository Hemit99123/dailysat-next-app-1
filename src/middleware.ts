import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession as getEmployeeSession } from './lib/employeeSession';

export const middleware = async (request: NextRequest) => {
  const protectedEmployeeBackendRoutes = ['/api/protected-employee'];
  const protectedEmployeeFrontendRoutes = ['/api-docs'];

  // Check if the request path matches any protected route for backend (ONLY EMPLOYEES ALLOWED)
  const isProtectedEmployeeBackend = protectedEmployeeBackendRoutes.includes(request.nextUrl.pathname);

  if (isProtectedEmployeeBackend) {
    const isSessionValid = await getEmployeeSession();

    if (!isSessionValid) {
      return NextResponse.json({
        error: "You do not have the proper employee authorization",
      });
    }
  }

  // Handle frontend for employee unauthorization (better UX with redirection)
  const isProtectedEmployeeFrontend = protectedEmployeeFrontendRoutes.includes(request.nextUrl.pathname);

  if (isProtectedEmployeeFrontend) {
    const isSessionValid = await getEmployeeSession();

    const url = request.nextUrl.clone();
    url.pathname = '/unauthorized';

    if (!isSessionValid) {
      return NextResponse.redirect(url);
    }
  }

  // Special handling for employee-authorize or employee-authorize/destroy routes
  if (request.nextUrl.pathname == "/employee-authorize") {
    const isSessionValid = await getEmployeeSession();

    const url = request.nextUrl.clone();

    if (isSessionValid) {
      url.pathname = '/employee-authorize/logout'; // Redirect to the dashboard or an appropriate page if authorized
      return NextResponse.redirect(url);
    } 
  }

  else if (request.nextUrl.pathname == "/employee-authorize/logout") {
    const isSessionValid = await getEmployeeSession();
    
    const url = request.nextUrl.clone()

    if (!isSessionValid) {
      url.pathname = '/employee-authorize'
      return NextResponse.redirect(url);
    }
  }

  // Allow request to proceed if no matching route is found
  return NextResponse.next();
};
