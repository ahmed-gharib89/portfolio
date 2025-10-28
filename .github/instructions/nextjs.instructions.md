---
applyTo: "src/app/**/*.tsx,src/app/**/*.ts"
description: "Next.js 14 App Router best practices"
---

# Next.js 14 Guidelines

Follow these Next.js App Router best practices for optimal performance and developer experience.

## App Router Conventions

- Use the App Router (not Pages Router) for all routes
- Organize routes using folder-based routing
- Use `page.tsx` for route pages
- Use `layout.tsx` for shared layouts
- Use `loading.tsx` for loading states
- Use `error.tsx` for error handling

## Server vs Client Components

- Default to Server Components for better performance
- Use `'use client'` directive only when needed (interactivity, hooks, browser APIs)
- Keep client components small and focused
- Pass data from Server to Client Components via props
- Avoid unnecessary client-side JavaScript

## Data Fetching

- Fetch data in Server Components when possible
- Use async/await in Server Components
- Implement proper error handling for data fetching
- Use parallel data fetching where appropriate
- Leverage Next.js caching strategies

## Metadata and SEO

- Export metadata from page components
- Use generateMetadata for dynamic metadata
- Include Open Graph and Twitter card metadata
- Implement proper title templates
- Add structured data (JSON-LD) where appropriate

## Image Optimization

- Use Next.js Image component for all images
- Specify width and height attributes
- Use appropriate image formats (WebP, AVIF)
- Implement lazy loading for images
- Optimize image sizes for different viewports

## Performance

- Minimize JavaScript bundle size
- Use dynamic imports for code splitting
- Implement Suspense boundaries strategically
- Optimize Core Web Vitals (LCP, FID, CLS)
- Use the Next.js built-in performance monitoring

## API Routes

- Use Route Handlers in the App Router
- Implement proper HTTP methods (GET, POST, etc.)
- Validate request data
- Return appropriate HTTP status codes
- Handle errors gracefully with try-catch blocks

## Best Practices

- Use TypeScript for type safety
- Follow the principle of least privilege for data access
- Implement proper security headers
- Use environment variables for sensitive data
- Test both server and client rendering
