import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of section paths that should all direct to the homepage
const SECTION_PATHS = ['/home', '/about', '/experience', '/projects', '/skills', '/contact'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if this is a section path
  if (SECTION_PATHS.includes(pathname)) {
    // Keep the path in URL but serve the homepage content
    // This preserves the URL for SEO while still allowing the client-side navigation to work
    return NextResponse.rewrite(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// Only run middleware on specific paths
export const config = {
  matcher: ['/home', '/about', '/experience', '/projects', '/skills', '/contact'],
};
