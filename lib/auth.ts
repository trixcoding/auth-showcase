import { getSessionUser } from './session';
import { getJwtUser } from './jwt';
import pool from './db';

export type AuthMethod = 'session' | 'jwt' | null;

export interface CurrentUser {
  id: number;
  email: string;
  name: string | null;
  method: AuthMethod;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
 
  const sessionUser = await getSessionUser();
  if (sessionUser) {
    return { ...sessionUser, method: 'session' };
  }

  
  const jwtPayload = await getJwtUser();
  if (jwtPayload) {
    const result = await pool.query(
      'SELECT id, email, name FROM users WHERE id = $1',
      [jwtPayload.userId]
    );
    const user = result.rows[0];
    if (user) {
      return { ...user, method: 'jwt' };
    }
  }

  return null;
}