import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isTenantRoute = createRouteMatcher(['/tenant(.*)']);

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth();

  // Extract custom role from Clerk publicMetadata or claims
  const role = (sessionClaims?.metadata as { role?: string })?.role || 'tenant';

  if (isAdminRoute(req)) {
    if (!userId || role !== 'admin') {
      const url = new URL('/sign-in', req.url);
      return NextResponse.redirect(url);
    }
  }

  if (isTenantRoute(req)) {
    if (!userId) {
      const url = new URL('/sign-in', req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
