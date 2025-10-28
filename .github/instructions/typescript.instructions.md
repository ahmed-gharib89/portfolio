---
applyTo: "**/*.ts,**/*.tsx"
description: "TypeScript development guidelines for Next.js portfolio"
---

# TypeScript Guidelines

Apply these TypeScript best practices to all code in the project.

## Type Safety

- Enable strict mode in `tsconfig.json` and adhere to strict type checking
- Define explicit return types for all functions and methods
- Use interfaces for object shapes and type aliases for unions/primitives
- Avoid using `any` type; use `unknown` when type is truly unknown
- Leverage TypeScript's utility types (Partial, Required, Pick, Omit, etc.)

## Naming Conventions

- Use PascalCase for types, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix interfaces with descriptive names (avoid `I` prefix)
- Use descriptive names that convey purpose and meaning

## Type Definitions

- Define types close to where they're used
- Export shared types from a central location
- Use readonly for immutable data structures
- Prefer const assertions for literal types
- Use discriminated unions for complex state management

## React with TypeScript

- Use `React.FC` sparingly; prefer explicit typing
- Type all props interfaces explicitly
- Use generic types for reusable components
- Type event handlers with proper React event types
- Leverage TypeScript for better IntelliSense and autocomplete

## Next.js Specific

- Type page props using `PageProps` pattern
- Type API route handlers with proper request/response types
- Use TypeScript for metadata exports
- Type server actions and server components appropriately

## Import Organization

- Group imports: React, Next.js, third-party, local
- Use path aliases (`@/*`) for cleaner imports
- Avoid circular dependencies
