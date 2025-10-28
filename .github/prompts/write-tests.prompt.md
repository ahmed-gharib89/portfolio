---
agent: 'agent'
tools: ['edit', 'search', 'upstash/context7/*', 'todos', 'vscode.mermaid-chat-features/renderMermaidDiagram', 'digitarald.agent-memory/memory', 'runSubagent', 'usages', 'changes', 'fetch', 'mermaidchart.vscode-mermaid-chart/get_syntax_docs', 'mermaidchart.vscode-mermaid-chart/mermaid-diagram-validator', 'mermaidchart.vscode-mermaid-chart/mermaid-diagram-preview']
description: 'Generate unit tests for components and functions'
---

# Write Tests

Your goal is to generate comprehensive tests for React components or utility functions following the project's testing standards.

## Requirements

Ask for the following if not provided:
1. **File to test**: Which component or function needs tests?
2. **Test scenarios**: What specific behaviors should be tested?
3. **Edge cases**: Are there any edge cases to consider?

## Testing Strategy

### Component Tests
- Test rendering with different props
- Test user interactions (clicks, inputs, etc.)
- Test conditional rendering logic
- Test accessibility features
- Mock external dependencies

### Function Tests
- Test expected outputs for various inputs
- Test edge cases and error conditions
- Test boundary conditions
- Verify error handling

## Test Structure

Use this pattern for all tests:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    // Arrange
    const props = { /* test props */ };

    // Act
    render(<ComponentName {...props} />);

    // Assert
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('should handle user interaction', () => {
    // Arrange
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick} />);

    // Act
    fireEvent.click(screen.getByRole('button'));

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Best Practices

- Use descriptive test names that explain what is being tested
- Follow AAA pattern: Arrange, Act, Assert
- Test user-visible behavior, not implementation details
- Use Testing Library queries (getByRole, getByText, etc.)
- Mock external dependencies appropriately
- Keep tests focused and independent
- Clean up after tests

## Testing Checklist

For React Components:
- [ ] Renders with default props
- [ ] Renders with various prop combinations
- [ ] Handles user interactions correctly
- [ ] Shows correct content based on state
- [ ] Displays loading/error states
- [ ] Is accessible (ARIA, keyboard navigation)
- [ ] Responds to prop changes

For Utility Functions:
- [ ] Returns expected output for valid inputs
- [ ] Handles edge cases correctly
- [ ] Throws errors for invalid inputs
- [ ] Works with boundary values
- [ ] Maintains type safety

## File Naming

Place test files next to the code they test:
```
ComponentName.tsx
ComponentName.test.tsx
```

Or in a `__tests__` directory:
```
__tests__/
  └── ComponentName.test.tsx
```
