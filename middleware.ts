import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory store for rate limiting (Note: This is per-instance and ephemeral)
// In a real distributed production environment, use Redis or Upstash.
const rateLimitMap = new Map();

export function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const limit = 100; // Limit to 100 requests per window
    const windowMs = 60 * 1000; // 1 minute window

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, {
            count: 0,
            lastReset: Date.now(),
        });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.lastReset > windowMs) {
        ipData.count = 0;
        ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
        return new NextResponse('Too Many Requests', { status: 429 });
    }

    ipData.count += 1;

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};
