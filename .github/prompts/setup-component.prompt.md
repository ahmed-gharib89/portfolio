---
agent: 'agent'
tools: ['edit', 'search', 'upstash/context7/*', 'todos', 'vscode.mermaid-chat-features/renderMermaidDiagram', 'digitarald.agent-memory/memory', 'runSubagent', 'usages', 'changes', 'fetch', 'mermaidchart.vscode-mermaid-chart/get_syntax_docs', 'mermaidchart.vscode-mermaid-chart/mermaid-diagram-validator', 'mermaidchart.vscode-mermaid-chart/mermaid-diagram-preview']
description: 'Generate a new React component for the portfolio project'
---

# Create New Component

Your goal is to generate a new React component following the portfolio project's established patterns and best practices.

## Requirements

Ask for the following if not provided:
1. **Component name**: What should the component be called?
2. **Component type**: Is it a page section, layout component, or UI component?
3. **Purpose**: What is the primary function of this component?
4. **Props**: What props does the component need?

## Component Structure

Create the component following these guidelines:

### TypeScript & React
- Use TypeScript with explicit prop interface definitions
- Use functional components with hooks
- Follow the existing project patterns in `src/components/`
- Import React types from 'react'

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Reference design tokens from `src/styles/tokens.ts` if needed
- Maintain consistency with existing components

### Accessibility
- Use semantic HTML elements
- Include proper ARIA labels where needed
- Ensure keyboard navigation support
- Add descriptive alt text for images

### Performance
- Use React.memo if the component is expensive to render
- Implement proper key props for dynamic lists
- Consider code splitting for large components
- Use Next.js Image component for images

### File Structure
```
src/components/[category]/
  └── ComponentName.tsx
```

Categories:
- `sections/` - Page sections (Hero, About, Projects, etc.)
- `layout/` - Layout components (Header, Footer, etc.)
- `ui/` - Reusable UI components
- `animation/` - Animation components

## Example Component Template

```typescript
interface ComponentNameProps {
  // Define props here
}

export default function ComponentName({ }: ComponentNameProps) {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  );
}
```

## Next Steps

After creating the component:
1. Verify TypeScript types are correct
2. Check responsive design on different screen sizes
3. Test keyboard navigation
4. Consider adding unit tests
5. Update parent components to import and use the new component
