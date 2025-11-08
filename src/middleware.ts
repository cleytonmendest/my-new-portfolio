import { NextRequest, NextResponse } from 'next/server';

export function middleware(_request: NextRequest) {
  // Middleware não precisa fazer nada especial
  // O locale será detectado via cookie no request.ts
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
