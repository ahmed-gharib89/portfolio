---
applyTo: "**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx"
description: "Testing standards and best practices"
---

# Testing Guidelines

Follow these testing practices to ensure code quality and reliability.

## Testing Strategy

- Write unit tests for utility functions and helpers
- Write component tests for React components
- Write integration tests for API routes and data flows
- Implement end-to-end tests for critical user journeys
- Aim for meaningful coverage, not just high percentages

## Test Structure

- Follow AAA pattern: Arrange, Act, Assert
- Use descriptive test names that explain what is being tested
- Group related tests using `describe` blocks
- Keep tests focused on a single behavior
- Make tests independent and isolated

## Component Testing

- Test component rendering and output
- Test user interactions and event handlers
- Test conditional rendering logic
- Test accessibility features
- Mock external dependencies appropriately

## Best Practices

- Write tests before or alongside code (TDD encouraged)
- Keep tests simple and readable
- Avoid testing implementation details
- Use data-testid attributes for stable selectors
- Clean up after tests (unmount, clear mocks)

## Mocking

- Mock external API calls and services
- Use jest.mock for module mocking
- Mock only what's necessary
- Verify mock calls when testing integrations
- Reset mocks between tests

## Testing Tools

- Use Jest as the test runner
- Use React Testing Library for component tests
- Use MSW (Mock Service Worker) for API mocking
- Use Playwright or Cypress for E2E tests
- Use Testing Library queries (getByRole, getByText, etc.)

## Assertions

- Use clear and specific assertions
- Test both positive and negative cases
- Verify error states and edge cases
- Check accessibility in component tests
- Assert on user-visible behavior, not internal state
