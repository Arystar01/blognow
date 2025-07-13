import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: [], // 👈 no routes are public
});

export const config = {
  matcher: [
    '/((?!_next/|favicon\\.ico|.*\\.(?:png|jpg|jpeg|webp|gif|svg|css|js|woff2?|ttf|eot|otf|mp4|mp3|json|txt)).*)',
  ],
};
