import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of section paths that should all direct to the homepage
const SECTION_PATHS = ['/home', '/about', '/experience', '/projects', '/skills', '/contact'];

// Map of old or common mistyped URLs to their correct destinations
const REDIRECT_MAP: Record<string, string> = {
  // Common misspellings or old URL patterns
  '/Home': '/',
  '/About': '/about',
  '/Experience': '/experience',
  '/Projects': '/projects',
  '/Skills': '/skills',
  '/Contact': '/contact',
  '/resume': '/about',
  '/cv': '/about',
  '/portfolio': '/projects',
  '/work': '/projects',
  '/services': '/skills',
  '/Blog': '/blog',
  '/blogs': '/blog',
  '/articles': '/blog',
  // Hash-based legacy URLs (in case they're still being linked to externally)
  '/#about': '/about',
  '/#experience': '/experience',
  '/#projects': '/projects',
  '/#skills': '/skills',
  '/#contact': '/contact',
  // Old blog post URL patterns if they've been changed
  '/blog-post': '/blog',
  '/posts': '/blog',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if this is a path that needs to be redirected
  if (pathname in REDIRECT_MAP) {
    // Use 301 (permanent) redirect for SEO benefit
    return NextResponse.redirect(new URL(REDIRECT_MAP[pathname], request.url), { status: 301 });
  }
  
  // Check if this is a section path that should serve the homepage content
  if (SECTION_PATHS.includes(pathname)) {
    // Keep the path in URL but serve the homepage content
    // This preserves the URL for SEO while still allowing the client-side navigation to work
    return NextResponse.rewrite(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// Update matcher to include all paths we want to handle
export const config = {
  matcher: [
    // Include original section paths
    '/home', '/about', '/experience', '/projects', '/skills', '/contact',
    // Include paths for redirects (uppercase variations)
    '/Home', '/About', '/Experience', '/Projects', '/Skills', '/Contact', '/Blog',
    // Include legacy and alternate paths
    '/resume', '/cv', '/portfolio', '/work', '/services', '/blogs', '/articles',
    // Include hash-based legacy URLs
    '/#about', '/#experience', '/#projects', '/#skills', '/#contact',
    // Include old blog patterns
    '/blog-post', '/posts'
  ],
};
