import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LogoutButton from './LogoutButton';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">پروفایل</h1>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              user.method === 'session'
                ? 'bg-blue-50 text-blue-700'
                : 'bg-purple-50 text-purple-700'
            }`}
          >
            {user.method === 'session' ? 'Session-based' : 'JWT'}
          </span>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p>
            <span className="text-gray-400">نام: </span>
            <span className="text-gray-900">{user.name ?? '—'}</span>
          </p>
          <p>
            <span className="text-gray-400">ایمیل: </span>
            <span className="text-gray-900">{user.email}</span>
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-3">
            {user.method === 'session'
              ? 'شناسایی شما با یک شناسه‌ی session در کوکی httpOnly انجام شده که مستقیم به دیتابیس مرتبطه.'
              : 'شناسایی شما با یک JWT امضاشده در کوکی httpOnly انجام شده که خودش حامل اطلاعات کاربره.'}
          </p>
          <LogoutButton method={user.method!} />
        </div>
      </div>
    </div>
  );
}