'use server';

import pool from '@/lib/db';
import { hashPassword } from '@/lib/password';
import { redirect } from 'next/navigation';
import { ActionState } from '@/types/user';

export async function registerAction(
  prevState: ActionState,
    formData: FormData
    ): Promise<ActionState> {
      const email = formData.get('email') as string;
        const password = formData.get('password') as string;
          const name = formData.get('name') as string;

            // اعتبارسنجی
              if (!email || !password) {
                  return { error: 'ایمیل و رمز عبور الزامی است' };
                    }
                      if (password.length < 6) {
                          return { error: 'رمز عبور باید حداقل ۶ کاراکتر باشد' };
                            }

                              // چک تکراری نبودن ایمیل
                                const existing = await pool.query('SELECT id FROM users WHERE email = $1', [
                                    email,
                                      ]);
                                        if (existing.rows.length > 0) {
                                            return { error: 'این ایمیل قبلاً ثبت شده' };
                                              }

                                                // ذخیره
                                                  const passwordHash = await hashPassword(password);
                                                    await pool.query(
                                                        'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)',
                                                            [email, passwordHash, name || null]
                                                              );

                                                                redirect('/login');
                                                                }