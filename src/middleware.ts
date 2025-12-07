import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware now only validates existing sessions (doesn't force login)
// Authentication is optional - users can sign in to save progress

const SESSION_SECRET = process.env.SESSION_SECRET || 'mnd-playbook-secret-key';

function validateSession(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');

    // Token format: userId:username:timestamp:secret
    if (parts.length !== 4) {
      return false;
    }

    const [, , timestamp, secret] = parts;

    if (secret !== SESSION_SECRET) {
      return false;
    }

    const sessionAge = Date.now() - parseInt(timestamp, 10);
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days

    return sessionAge <= maxAge;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session')?.value;

  // Clear invalid sessions
  if (sessionToken && !validateSession(sessionToken)) {
    const response = NextResponse.next();
    response.cookies.delete('session');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
