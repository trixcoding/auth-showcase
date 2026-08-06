import pool from '@/lib/db';
import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; 

export async function createSession(userId: number): Promise<string> {
  const sessionId = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

      await pool.query(
          'INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)',
              [sessionId, userId, expiresAt]
                );

                  const cookieStore = await cookies();
                    cookieStore.set('session_id', sessionId, {
                        httpOnly: true,
                            secure: true,
                                sameSite: 'lax',
                                    expires: expiresAt,
                                        path: '/',
                                          });

                                            return sessionId;
                                            }

                                            export async function getSessionUser() {
                                              const cookieStore = await cookies();
                                                const sessionId = cookieStore.get('session_id')?.value;
                                                  if (!sessionId) return null;

                                                    const result = await pool.query(
                                                        `SELECT users.id, users.email, users.name
                                                             FROM sessions
                                                                  JOIN users ON users.id = sessions.user_id
                                                                       WHERE sessions.id = $1 AND sessions.expires_at > NOW()`,
                                                                           [sessionId]
                                                                             );

                                                                               return result.rows[0] ?? null;
                                                                               }

                                                                               export async function destroySession() {
                                                                                 const cookieStore = await cookies();
                                                                                   const sessionId = cookieStore.get('session_id')?.value;
                                                                                     if (sessionId) {
                                                                                         await pool.query('DELETE FROM sessions WHERE id = $1', [sessionId]);
                                                                                           }
                                                                                             cookieStore.delete('session_id');
                                                                                             }