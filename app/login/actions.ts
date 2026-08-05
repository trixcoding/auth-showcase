'use server';

import pool from '@/lib/db';
import { verifyPassword } from '@/lib/password';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { ActionState } from '@/types/user';
import { signAccessToken, signRefreshToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function loginWithSessionAction(
  prevState: ActionState,
    formData: FormData
    ): Promise<ActionState> {
      const email = formData.get('email') as string;
        const password = formData.get('password') as string;

          if (!email || !password) {
              return { error: 'ایمیل و رمز عبور الزامی است' };
                }

                  const result = await pool.query(
                      'SELECT id, password_hash FROM users WHERE email = $1',
                          [email]
                            );
                              const user = result.rows[0];

                                if (!user || !(await verifyPassword(password, user.password_hash))) {
                                    return { error: 'ایمیل یا رمز عبور اشتباه است' };
                                      }

                                        await createSession(user.id);
                                          redirect('/profile');
                                          }



export async function loginWithJwtAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'ایمیل و رمز عبور الزامی است' };
  }

  const result = await pool.query(
    'SELECT id, email, password_hash FROM users WHERE email = $1',
    [email]
  );
  const user = result.rows[0];

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return { error: 'ایمیل یا رمز عبور اشتباه است' };
  }

  const payload = { userId: user.id, email: user.email };
  const accessToken = await signAccessToken(payload);
  const refreshToken = await signRefreshToken(payload);

  const cookieStore = await cookies();
  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 15 * 60, // ۱۵ دقیقه
    path: '/',
  });
  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // ۷ روز
    path: '/',
  });

  redirect('/profile');
}