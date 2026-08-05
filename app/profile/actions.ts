'use server';

import { destroySession } from '@/lib/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction(method: 'session' | 'jwt') {
  if (method === 'session') {
    await destroySession();
  } else {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
  }
  redirect('/login');
}