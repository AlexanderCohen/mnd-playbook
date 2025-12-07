import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validatePassword, ensureDefaultAdmin } from '@/lib/db';

const SESSION_SECRET = process.env.SESSION_SECRET || 'mnd-playbook-secret-key';

function generateSessionToken(username: string, userId: number): string {
  const timestamp = Date.now();
  const data = `${userId}:${username}:${timestamp}:${SESSION_SECRET}`;
  return Buffer.from(data).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    // Ensure default admin exists on first login attempt
    await ensureDefaultAdmin();

    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const user = await validatePassword(username, password);

    if (user) {
      const token = generateSessionToken(username, user.id);

      const cookieStore = await cookies();
      cookieStore.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return NextResponse.json({ success: true, username });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
