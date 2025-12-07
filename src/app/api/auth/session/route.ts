import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserById } from '@/lib/db';

const SESSION_SECRET = process.env.SESSION_SECRET || 'mnd-playbook-secret-key';

async function validateSession(token: string): Promise<{ valid: boolean; userId?: number; username?: string }> {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [userId, username, timestamp, secret] = decoded.split(':');

    if (secret !== SESSION_SECRET) {
      return { valid: false };
    }

    // Check if session is not older than 7 days
    const sessionAge = Date.now() - parseInt(timestamp, 10);
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

    if (sessionAge > maxAge) {
      return { valid: false };
    }

    // Verify user still exists in database
    const user = await getUserById(parseInt(userId, 10));
    if (!user) {
      return { valid: false };
    }

    return { valid: true, userId: parseInt(userId, 10), username };
  } catch {
    return { valid: false };
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;

  if (!sessionToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const { valid, username } = await validateSession(sessionToken);

  if (!valid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, username });
}
