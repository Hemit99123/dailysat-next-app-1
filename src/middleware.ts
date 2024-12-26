import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession as getEmployeeSession } from './lib/auth/employeeSession';
import { useLoggedInStore } from './store/user';

export const middleware = async (request: NextRequest) => {
  const protectedEmployeeBackendRoutes = ['/api/protected-employee'];
  const protectedEmployeeFrontendRoutes = ['/api-docs'];
  const loginRequiredRoutes = ["/reading","/math"];

  // Check if the request path matches any protected route for backend (ONLY EMPLOYEES ALLOWED)
  const isProtectedEmployeeBackend = protectedEmployeeBackendRoutes.includes(request.nextUrl.pathname);
  const isLoginRequiredRoute = loginRequiredRoutes.includes(request.nextUrl.href);

  if (isProtectedEmployeeBackend) {
    const isSessionValid = await getEmployeeSession();

    if (!isSessionValid) {
      return NextResponse.json({
        error: "You do not have the proper employee authorization",
      });
    }
  }

  if(isLoginRequiredRoute){
    if(JSON.parse(localStorage.getItem("loggedin") || "false") == false){
      const url = request.nextUrl.clone();
      url.pathname = "/signup"
      return NextResponse.redirect(url);
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
