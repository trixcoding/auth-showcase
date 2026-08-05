'use client';

import { logoutAction } from './actions';

export default function LogoutButton({ method }: { method: 'session' | 'jwt' }) {
  return (
    <form action={logoutAction.bind(null, method)}>
      <button
        type="submit"
        className="text-sm text-red-600 hover:underline"
      >
        خروج
      </button>
    </form>
  );
}