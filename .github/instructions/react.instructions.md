---
applyTo: "**/*.tsx,**/*.jsx"
description: "React development best practices"
---

# React Development Guidelines

Follow these React best practices for building maintainable components.

## Component Structure

- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Extract complex logic into custom hooks
- Organize component files with a consistent structure (imports, types, component, exports)
- Co-locate related components in feature directories

## Hooks Best Practices

- Follow the Rules of Hooks (only call at top level, only in React functions)
- Use `useState` for local component state
- Use `useEffect` for side effects with proper dependency arrays
- Create custom hooks for reusable stateful logic
- Use `useCallback` and `useMemo` for performance optimization when needed

## Props and State

- Define prop interfaces explicitly with TypeScript
- Use destructuring for props
- Prefer immutable state updates
- Lift state up when shared between components
- Use composition over prop drilling

## Performance

- Use React.memo for expensive components
- Implement proper key props for lists
- Avoid inline function definitions in render
- Use lazy loading for code splitting
- Optimize re-renders by minimizing state updates

## Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Extract repeated patterns into reusable components
- Use Tailwind's theme configuration for consistency
- Avoid inline styles unless dynamic values are needed

## Accessibility

- Use semantic HTML elements
- Include ARIA labels where appropriate
- Ensure keyboard navigation works
- Provide alternative text for images
- Test with screen readers

## Error Handling

- Implement error boundaries for robust error handling
- Provide meaningful error messages
- Handle loading and error states in components
- Use Suspense boundaries for async components
