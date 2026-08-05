import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
          نمونه‌کار احراز هویت
        </span>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Auth Showcase
        </h1>
        <p className="text-gray-500 leading-relaxed mb-10">
          یک پروژه‌ی نمایشی که دو روش اصلی احراز هویت در وب —{' '}
          <span className="text-gray-900 font-medium">Session-based</span> و{' '}
          <span className="text-gray-900 font-medium">JWT</span> — رو کنار هم
          و به‌صورت کاملاً واقعی پیاده‌سازی می‌کنه.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3 transition"
          >
            ورود
          </Link>
          <Link
            href="/register"
            className="border border-gray-300 hover:border-gray-400 text-gray-900 font-medium rounded-lg px-6 py-3 transition"
          >
            ثبت‌نام
          </Link>
        </div>

        <Link
          href="/about"
          className="text-sm text-gray-400 hover:text-blue-600 transition"
        >
          توضیح فنی پروژه ←
        </Link>
      </div>
    </div>
  );
}