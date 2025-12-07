'use server';

import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

// Database file stored in project root (outside of src)
const dbPath = path.join(process.cwd(), 'data', 'users.db');

// Ensure data directory exists
import fs from 'fs';
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface User {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export async function createUser(username: string, password: string): Promise<User | null> {
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const stmt = db.prepare(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)'
    );
    const result = stmt.run(username, passwordHash);

    return await getUserById(result.lastInsertRowid as number);
  } catch (error: unknown) {
    // Username already exists
    if (error instanceof Error && error.message.includes('UNIQUE constraint')) {
      return null;
    }
    throw error;
  }
}

export async function getUserById(id: number): Promise<User | null> {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as User | null;
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  return stmt.get(username) as User | null;
}

export async function validatePassword(username: string, password: string): Promise<User | null> {
  const user = await getUserByUsername(username);

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password_hash);

  return isValid ? user : null;
}

export async function getAllUsers(): Promise<Omit<User, 'password_hash'>[]> {
  const stmt = db.prepare('SELECT id, username, created_at, updated_at FROM users');
  return stmt.all() as Omit<User, 'password_hash'>[];
}

export async function deleteUser(id: number): Promise<boolean> {
  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

export async function updatePassword(id: number, newPassword: string): Promise<boolean> {
  const passwordHash = await bcrypt.hash(newPassword, 10);
  const stmt = db.prepare(
    'UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  );
  const result = stmt.run(passwordHash, id);
  return result.changes > 0;
}

export async function userCount(): Promise<number> {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM users');
  const result = stmt.get() as { count: number };
  return result.count;
}

// Create default admin user if no users exist
export async function ensureDefaultAdmin(): Promise<void> {
  if ((await userCount()) === 0) {
    const defaultUsername = process.env.AUTH_USERNAME || 'admin';
    const defaultPassword = process.env.AUTH_PASSWORD || 'password';
    await createUser(defaultUsername, defaultPassword);
    console.log(`Created default admin user: ${defaultUsername}`);
  }
}
