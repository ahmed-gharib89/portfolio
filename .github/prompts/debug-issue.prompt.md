---
agent: 'agent'
tools: ['edit', 'search', 'upstash/context7/*', 'todos', 'vscode.mermaid-chat-features/renderMermaidDiagram', 'digitarald.agent-memory/memory', 'runSubagent', 'usages', 'changes', 'fetch', 'mermaidchart.vscode-mermaid-chart/get_syntax_docs', 'mermaidchart.vscode-mermaid-chart/mermaid-diagram-validator', 'mermaidchart.vscode-mermaid-chart/mermaid-diagram-preview']
description: 'Debug and fix issues in the codebase'
---

# Debug Issue

Your goal is to identify and fix bugs or issues in the codebase systematically.

## Requirements

Ask for the following if not provided:
1. **Issue description**: What is the problem or error?
2. **Expected behavior**: What should happen?
3. **Actual behavior**: What is actually happening?
4. **Steps to reproduce**: How can the issue be reproduced?
5. **Error messages**: Any error messages or stack traces?

## Debugging Process

### 1. Understand the Issue
- Read the error message carefully
- Identify the affected component or function
- Understand the expected vs actual behavior
- Gather context from the codebase

### 2. Locate the Problem
- Use error stack traces to find the source
- Search for related code in the codebase
- Check recent changes that might have caused it
- Review component hierarchy and data flow

### 3. Identify the Root Cause
- Trace the code execution path
- Check variable values and state
- Verify type correctness
- Review logic and conditions
- Check for race conditions or timing issues

### 4. Develop a Fix
- Plan the minimal change to fix the issue
- Consider edge cases
- Ensure the fix doesn't break other functionality
- Follow project coding standards

### 5. Test the Fix
- Verify the issue is resolved
- Test related functionality
- Check for regressions
- Add tests to prevent recurrence

## Common Issue Categories

### TypeScript Errors
- Type mismatches
- Missing or incorrect types
- Type assertions needed
- Generic type issues

**Check for:**
- Prop type definitions
- Function return types
- Type imports and exports
- null/undefined handling

### React Issues
- Component not rendering
- State not updating
- Infinite re-renders
- Hook dependency warnings
- Event handler issues

**Check for:**
- Hook rules violations
- Dependency arrays
- State initialization
- Event binding
- Component keys

### Next.js Issues
- Hydration errors
- Server/Client component conflicts
- Routing problems
- Data fetching errors
- Build/deploy issues

**Check for:**
- 'use client' directives
- Async component patterns
- Dynamic imports
- Metadata configuration
- Environment variables

### Performance Issues
- Slow rendering
- Memory leaks
- Large bundle size
- Unnecessary re-renders

**Check for:**
- Missing memoization
- Large dependencies
- Inefficient algorithms
- Resource cleanup

### Styling Issues
- Layout problems
- Responsive design breaks
- CSS conflicts
- Animation glitches

**Check for:**
- Tailwind class conflicts
- z-index issues
- Flexbox/Grid mistakes
- Media query problems

## Debugging Checklist

- [ ] Read error message thoroughly
- [ ] Identify affected code location
- [ ] Reproduce the issue consistently
- [ ] Check recent code changes
- [ ] Review related code and dependencies
- [ ] Understand the root cause
- [ ] Plan minimal fix
- [ ] Implement the fix
- [ ] Test the fix thoroughly
- [ ] Check for regressions
- [ ] Add tests to prevent recurrence
- [ ] Document if needed

## Debugging Tools

### Browser DevTools
- Console for errors and logs
- Network tab for API calls
- React DevTools for component inspection
- Performance profiler

### VS Code
- Breakpoints and debugging
- TypeScript error checking
- Extension tools
- Integrated terminal

### Next.js
- Error overlay in development
- Build output messages
- Console warnings
- Server logs

## Common Fixes

### TypeScript Error
```typescript
// Before: Type error
function Component({ data }: { data: any }) {
  return <div>{data.name}</div>;
}

// After: Proper typing
interface ComponentProps {
  data: { name: string };
}
function Component({ data }: ComponentProps) {
  return <div>{data.name}</div>;
}
```

### React Hook Error
```typescript
// Before: Hook dependency warning
useEffect(() => {
  fetchData(userId);
}, []); // Missing dependency

// After: Correct dependencies
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

### Next.js Hydration Error
```typescript
// Before: Hydration mismatch
export default function Page() {
  return <div>{Math.random()}</div>;
}

// After: Consistent rendering
'use client';
export default function Page() {
  const [value, setValue] = useState(0);
  useEffect(() => setValue(Math.random()), []);
  return <div>{value}</div>;
}
```

## Prevention

After fixing:
- Add tests for the bug
- Document the issue if complex
- Review related code for similar issues
- Consider refactoring if the code is fragile
- Update error handling if needed
