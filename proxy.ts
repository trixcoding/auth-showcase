import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/profile')) {
    const sessionId = req.cookies.get('session_id')?.value;
    const accessToken = req.cookies.get('access_token')?.value;

    // اگه هیچ‌کدوم از دو نوع کوکی نبود، همون‌جا ریدایرکت کن
    if (!sessionId && !accessToken) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // اگه فقط JWT بود، حداقل صحت امضاش رو اینجا هم چک کن (سبک‌تر از query دیتابیس)
    if (!sessionId && accessToken) {
      const payload = await verifyToken(accessToken);
      if (!payload) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*'],
};