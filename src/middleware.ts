import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import handleUserRoutes from '@/lib/middleware/auth/reg-user';

export const middleware = async (request: NextRequest) => {
  const userResponse = await handleUserRoutes(request);
  if (userResponse) return userResponse;

  // added comments
  return NextResponse.next();
};
