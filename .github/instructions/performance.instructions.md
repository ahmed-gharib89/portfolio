---
applyTo: "**/*.ts,**/*.tsx,**/*.js,**/*.jsx"
description: "Performance optimization guidelines"
---

# Performance Guidelines

Follow these performance best practices to ensure fast load times and smooth user experience.

## Core Web Vitals

- Optimize for Largest Contentful Paint (LCP < 2.5s)
- Minimize First Input Delay (FID < 100ms)
- Reduce Cumulative Layout Shift (CLS < 0.1)
- Monitor and improve Time to First Byte (TTFB)
- Use Next.js analytics to track metrics

## Image Optimization

- Use Next.js Image component for automatic optimization
- Specify appropriate image sizes and formats
- Implement lazy loading for below-fold images
- Use modern image formats (WebP, AVIF)
- Optimize image compression without sacrificing quality

## JavaScript Optimization

- Minimize bundle size with code splitting
- Use dynamic imports for large components
- Remove unused code and dependencies
- Defer non-critical JavaScript
- Implement tree-shaking for unused exports

## React Performance

- Use React.memo for expensive component renders
- Implement proper key props for lists
- Avoid unnecessary re-renders with useMemo and useCallback
- Profile components with React DevTools
- Lazy load components that aren't immediately visible

## CSS Performance

- Use Tailwind CSS utility classes for optimal CSS generation
- Purge unused CSS in production builds
- Minimize CSS-in-JS runtime overhead
- Avoid layout thrashing
- Use CSS containment where appropriate

## Network Optimization

- Implement proper caching strategies
- Use Next.js automatic static optimization
- Minimize API calls with data aggregation
- Implement request deduplication
- Use compression (gzip, brotli) for assets

## Server-Side Performance

- Optimize database queries
- Implement pagination for large datasets
- Use server-side caching where appropriate
- Minimize API response payload sizes
- Implement parallel data fetching

## Build Optimization

- Enable Next.js production optimizations
- Use environment-specific configurations
- Minimize third-party dependencies
- Analyze bundle size regularly
- Remove source maps from production builds

## Monitoring

- Use performance monitoring tools
- Set up performance budgets
- Track Core Web Vitals over time
- Monitor real user metrics (RUM)
- Identify and fix performance regressions
