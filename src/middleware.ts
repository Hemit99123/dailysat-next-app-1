import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import handleEmployeeRoutes from '@/lib/middleware/auth/employee';
import handleUserRoutes from '@/lib/middleware/auth/reg-user';

export const middleware = async (request: NextRequest) => {
  const employeeResponse = await handleEmployeeRoutes(request);
  if (employeeResponse) return employeeResponse;

  const userResponse = await handleUserRoutes(request);
  if (userResponse) return userResponse;

  return NextResponse.next();
};
