---
agent: 'agent'
tools: ['edit', 'search', 'upstash/context7/*', 'todos', 'vscode.mermaid-chat-features/renderMermaidDiagram', 'digitarald.agent-memory/memory', 'runSubagent', 'usages', 'changes', 'fetch', 'mermaidchart.vscode-mermaid-chart/get_syntax_docs', 'mermaidchart.vscode-mermaid-chart/mermaid-diagram-validator', 'mermaidchart.vscode-mermaid-chart/mermaid-diagram-preview']
description: 'Generate documentation for code, components, and APIs'
---

# Generate Documentation

Your goal is to generate comprehensive documentation following the project's documentation standards.

## Requirements

Ask for the following if not provided:
1. **What to document**: Component, function, API, or project section?
2. **Audience**: Developers, users, or both?
3. **Scope**: Quick reference or detailed guide?

## Documentation Types

### Component Documentation

For React components, document:
- **Purpose**: What does this component do?
- **Props**: All props with types and descriptions
- **Usage Examples**: How to use the component
- **Variants**: Different configurations or states
- **Accessibility**: Any accessibility features
- **Notes**: Special behaviors or limitations

Template:
```markdown
# ComponentName

Brief description of what the component does.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `propName` | `string` | Yes | - | Description of the prop |

## Usage

\`\`\`tsx
import ComponentName from '@/components/ComponentName';

export default function Example() {
  return <ComponentName propName="value" />;
}
\`\`\`

## Accessibility

- Semantic HTML elements used
- Keyboard navigation supported
- Screen reader friendly

## Notes

Any special considerations or limitations.
```

### Function Documentation

For utility functions, document:
- **Purpose**: What does this function do?
- **Parameters**: All parameters with types
- **Return Value**: What does it return?
- **Examples**: Usage examples
- **Edge Cases**: Any special considerations

Template:
```typescript
/**
 * Brief description of what the function does.
 *
 * @param paramName - Description of the parameter
 * @returns Description of the return value
 *
 * @example
 * ```typescript
 * const result = functionName('example');
 * console.log(result); // expected output
 * ```
 */
export function functionName(paramName: string): ReturnType {
  // implementation
}
```

### API Route Documentation

For API routes, document:
- **Endpoint**: HTTP method and path
- **Description**: What does this endpoint do?
- **Request**: Body, query params, headers
- **Response**: Success and error responses
- **Examples**: Request/response examples
- **Authentication**: If required

Template:
```markdown
# POST /api/contact

Send a contact form message.

## Request

\`\`\`typescript
{
  name: string;
  email: string;
  message: string;
}
\`\`\`

## Response

### Success (200)
\`\`\`json
{
  "success": true,
  "message": "Message sent successfully"
}
\`\`\`

### Error (400)
\`\`\`json
{
  "success": false,
  "error": "Validation error message"
}
\`\`\`

## Example

\`\`\`typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
});
\`\`\`
```

### README Documentation

For README files, include:
- Project overview and purpose
- Features and highlights
- Installation instructions
- Usage guide
- Configuration options
- Development setup
- Scripts and commands
- Contributing guidelines
- License information

## Documentation Best Practices

### Be Clear and Concise
- Use simple, direct language
- Avoid jargon unless necessary
- Explain technical terms
- Use examples to clarify

### Keep It Updated
- Update docs when code changes
- Remove outdated information
- Verify examples still work
- Version documentation when needed

### Use Proper Formatting
- Use headings for organization
- Use code blocks with syntax highlighting
- Use tables for structured data
- Use lists for step-by-step instructions

### Include Examples
- Show real-world usage
- Cover common scenarios
- Include edge cases
- Provide copy-paste ready code

### Make It Accessible
- Use descriptive link text
- Provide alternative text for images
- Structure content logically
- Use semantic HTML in markdown

## Documentation Checklist

- [ ] Clear and descriptive title
- [ ] Brief overview/description
- [ ] All parameters/props documented
- [ ] Return values/responses documented
- [ ] Usage examples included
- [ ] Edge cases noted
- [ ] Accessibility considerations mentioned
- [ ] Code examples are correct and tested
- [ ] Formatting is consistent
- [ ] Links are valid
- [ ] No outdated information

## Tools and Formats

- Use Markdown for documentation files
- Use JSDoc for inline code documentation
- Use TypeScript for type documentation
- Follow the project's documentation structure
- Link related documentation together
