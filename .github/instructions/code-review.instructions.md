---
applyTo: "**/*"
description: "Code review standards and GitHub review guidelines"
---

# Code Review Guidelines

Follow these guidelines when reviewing code and submitting pull requests.

## Pull Request Requirements

- Keep PRs focused and reasonably sized
- Write clear, descriptive PR titles
- Include a detailed description of changes
- Reference related issues or tickets
- Ensure all tests pass before requesting review
- Update documentation as needed

## Code Review Checklist

- **Functionality**: Does the code work as intended?
- **Tests**: Are there appropriate tests? Do they pass?
- **Code Quality**: Is the code clean, readable, and maintainable?
- **Performance**: Are there any performance concerns?
- **Security**: Are there any security vulnerabilities?
- **Documentation**: Is the code properly documented?
- **Standards**: Does it follow project coding standards?

## Reviewer Responsibilities

- Review code promptly and thoroughly
- Provide constructive, actionable feedback
- Ask questions rather than making demands
- Acknowledge good work and improvements
- Focus on the code, not the person
- Suggest alternatives when requesting changes
- Approve when satisfied with the changes

## Author Responsibilities

- Respond to feedback professionally
- Explain design decisions when needed
- Be open to suggestions and improvements
- Make requested changes or discuss concerns
- Keep the PR updated and ready for review
- Resolve conversations when addressed
- Thank reviewers for their time

## Review Focus Areas

**Code Structure**
- Clear and logical organization
- Proper separation of concerns
- Reusable and composable components
- Appropriate abstraction levels

**TypeScript Usage**
- Proper type definitions
- No use of `any` without justification
- Correct use of interfaces and types
- Type safety maintained throughout

**React Best Practices**
- Proper hook usage
- Component composition
- Performance considerations
- Accessibility implementation

**Next.js Conventions**
- App Router best practices
- Server vs Client component usage
- Proper metadata implementation
- Optimized data fetching

**Testing**
- Adequate test coverage
- Meaningful test cases
- Tests are clear and maintainable
- Edge cases are considered

**Security**
- Input validation
- No exposed secrets
- Proper error handling
- Security best practices followed

## GitHub Review Features

- Use suggestion mode for small changes
- Mark conversations as resolved when addressed
- Request changes if issues must be fixed
- Approve when all concerns are addressed
- Use comments for discussions and questions
- Apply labels to categorize PRs

## Communication Guidelines

- Be respectful and professional
- Explain the "why" behind feedback
- Offer to pair on complex issues
- Celebrate improvements and good solutions
- Keep feedback specific and actionable
- Follow up on previous conversations
