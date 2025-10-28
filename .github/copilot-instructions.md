# Portfolio Project - GitHub Copilot Instructions

This is a Next.js 14 portfolio website built with TypeScript, React, and Tailwind CSS. The project showcases professional experience, projects, skills, and includes a blog and contact functionality.

## Project Overview

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Nodemailer for contact form

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
│   ├── animation/    # Animation components
│   ├── layout/       # Layout components (Header, Footer)
│   └── sections/     # Page sections (Hero, About, Projects, etc.)
├── lib/              # Utility functions and API helpers
└── styles/           # Global styles and design tokens
```

## Core Principles

1. **Type Safety**: Use TypeScript for all code with strict type checking
2. **Component-Based**: Build reusable, composable components
3. **Performance**: Optimize for Core Web Vitals and user experience
4. **Accessibility**: Follow WCAG 2.1 AA standards
5. **Responsive Design**: Mobile-first approach with Tailwind CSS
6. **SEO Optimization**: Implement proper metadata and semantic HTML

## Specific Instructions

- Follow the patterns established in existing components
- Use the App Router conventions (not Pages Router)
- Implement proper error boundaries and loading states
- Use Tailwind CSS utility classes for styling
- Leverage Framer Motion for smooth animations
- Ensure all interactive elements are keyboard accessible
- Write descriptive alt text for images
- Use semantic HTML elements appropriately

## Related Documentation

- [TypeScript Guidelines](instructions/typescript.instructions.md)
- [React Best Practices](instructions/react.instructions.md)
- [Next.js Guidelines](instructions/nextjs.instructions.md)
- [Testing Standards](instructions/testing.instructions.md)
- [Documentation Requirements](instructions/documentation.instructions.md)
- [Security Best Practices](instructions/security.instructions.md)
- [Performance Guidelines](instructions/performance.instructions.md)
- [Code Review Standards](instructions/code-review.instructions.md)
