export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <a href="/" className="text-blue-600 hover:underline text-sm">
          ← بازگشت به صفحه‌ی اصلی
        </a>

        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
          چرا این پروژه رو ساختم
        </h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          این یک پروژه‌ی نمایشیه که دو روش اصلی احراز هویت در وب — Session-based
          و JWT — رو کنار هم و به‌صورت واقعی پیاده‌سازی می‌کنه. هدف این بود که
          به‌جای توضیح تئوری تفاوت این دو روش، یک نمونه‌ی عملی داشته باشم که
          هر دو مسیر رو از ثبت‌نام تا خروج، به‌طور کامل پوشش بده.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mb-4">مقایسه‌ی دو روش</h2>
        <div className="border border-gray-200 rounded-xl overflow-hidden mb-8">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium"></th>
                <th className="px-4 py-3 font-medium">Session-based</th>
                <th className="px-4 py-3 font-medium">JWT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-3 text-gray-500">محل ذخیره‌سازی</td>
                <td className="px-4 py-3 text-gray-900">دیتابیس (جدول sessions)</td>
                <td className="px-4 py-3 text-gray-900">خودِ توکن (stateless)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-500">هر درخواست</td>
                <td className="px-4 py-3 text-gray-900">query به Postgres</td>
                <td className="px-4 py-3 text-gray-900">فقط verify امضا</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-500">خروج فوری</td>
                <td className="px-4 py-3 text-gray-900">ساده (پاک کردن رکورد)</td>
                <td className="px-4 py-3 text-gray-900">نیاز به لایه‌ی اضافه (blacklist)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-500">مقیاس‌پذیری افقی</td>
                <td className="px-4 py-3 text-gray-900">نیاز به دیتابیس مشترک</td>
                <td className="px-4 py-3 text-gray-900">بدون نیاز به state مشترک</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-3">معماری فنی</h2>
        <ul className="text-gray-600 leading-relaxed space-y-2 mb-8 list-disc pr-5">
          <li>کل پروژه با Server Components و Server Actions ساخته شده، بدون هیچ API Route جداگانه</li>
          <li>
            فرم‌ها با{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">
              useActionState
            </code>{' '}
            مستقیم به Server Action وصل‌اند
          </li>
          <li>
            برای JWT از کتابخانه‌ی{' '}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">jose</code>{' '}
            استفاده شده (سازگار با Edge Runtime، برخلاف jsonwebtoken)
          </li>
          <li>محافظت سه‌لایه: proxy.ts برای UX، خودِ صفحه برای اعتبارسنجی واقعی، هر Server Action هم مستقل خودش را چک می‌کند</li>
        </ul>

        <div className="border-t border-gray-100 pt-6">
          <a
            href="https://github.com/trixcoding/auth-showcase"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 transition text-sm"
          >
            مشاهده‌ی کد کامل روی گیت‌هاب
          </a>
        </div>
      </div>
    </div>
  );
}