---
agent: 'agent'
tools: ['edit', 'search', 'upstash/context7/*', 'todos', 'vscode.mermaid-chat-features/renderMermaidDiagram', 'digitarald.agent-memory/memory', 'runSubagent', 'usages', 'changes', 'fetch', 'mermaidchart.vscode-mermaid-chart/get_syntax_docs', 'mermaidchart.vscode-mermaid-chart/mermaid-diagram-validator', 'mermaidchart.vscode-mermaid-chart/mermaid-diagram-preview']
description: 'Refactor existing code for better quality and maintainability'
---

# Refactor Code

Your goal is to refactor existing code to improve quality, maintainability, performance, or readability while preserving functionality.

## Requirements

Ask for the following if not provided:
1. **Code to refactor**: Which file or component needs refactoring?
2. **Refactoring goal**: What aspect needs improvement?
   - Code organization
   - Performance optimization
   - Type safety
   - Readability
   - Reusability
   - Testing
3. **Constraints**: Are there any constraints or requirements?

## Refactoring Strategies

### Extract Components
- Identify repeated UI patterns
- Extract complex JSX into separate components
- Create reusable component library
- Improve component composition

### Extract Functions
- Move complex logic into utility functions
- Create custom hooks for reusable stateful logic
- Separate business logic from UI logic
- Improve testability

### Improve Type Safety
- Add explicit TypeScript types
- Replace `any` with proper types
- Use discriminated unions for state
- Leverage TypeScript utility types

### Optimize Performance
- Add React.memo where appropriate
- Use useMemo and useCallback strategically
- Implement code splitting
- Optimize re-renders

### Simplify State Management
- Consolidate related state
- Use useReducer for complex state
- Lift state appropriately
- Remove unnecessary state

### Improve Readability
- Simplify complex conditions
- Use meaningful variable names
- Add helpful comments
- Break down large functions

## Refactoring Process

1. **Understand Current Code**
   - Read and understand the existing implementation
   - Identify what needs improvement
   - Check for any tests that exist

2. **Plan Changes**
   - Outline the refactoring approach
   - Identify potential breaking changes
   - Consider impact on other parts of the codebase

3. **Make Changes Incrementally**
   - Refactor in small, logical steps
   - Keep the code working after each step
   - Test after each significant change

4. **Verify Functionality**
   - Ensure all existing tests still pass
   - Add tests if they don't exist
   - Test edge cases and user flows

5. **Update Documentation**
   - Update comments and JSDoc
   - Revise README if needed
   - Document any API changes

## Refactoring Checklist

Before refactoring:
- [ ] Understand the current implementation
- [ ] Check for existing tests
- [ ] Identify dependencies and usages
- [ ] Plan the refactoring approach

During refactoring:
- [ ] Make changes incrementally
- [ ] Keep functionality intact
- [ ] Follow project conventions
- [ ] Improve type safety
- [ ] Enhance readability

After refactoring:
- [ ] All tests pass
- [ ] No regressions introduced
- [ ] Code is more maintainable
- [ ] Documentation is updated
- [ ] Performance is same or better

## Common Refactoring Patterns

### Component Refactoring
```typescript
// Before: Large component with mixed concerns
export default function UserProfile() {
  // 200 lines of mixed logic
}

// After: Extracted components and hooks
export default function UserProfile() {
  const userData = useUserData();
  return (
    <>
      <UserHeader data={userData} />
      <UserStats data={userData} />
      <UserActivity data={userData} />
    </>
  );
}
```

### Hook Extraction
```typescript
// Before: Complex logic in component
const [data, setData] = useState();
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
// ... complex fetch logic

// After: Custom hook
const { data, loading, error } = useDataFetch(url);
```

### Type Improvement
```typescript
// Before: Loose typing
interface Props {
  data: any;
  status: string;
}

// After: Strict typing
interface Props {
  data: UserData;
  status: 'idle' | 'loading' | 'success' | 'error';
}
```

## Things to Avoid

- Don't refactor without understanding the code
- Don't change behavior while refactoring
- Don't skip testing after refactoring
- Don't mix refactoring with feature additions
- Don't refactor everything at once
- Don't ignore existing patterns without reason
