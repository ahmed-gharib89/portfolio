---
applyTo: "**/*.ts,**/*.tsx,**/*.js,**/*.jsx"
description: "Security best practices and guidelines"
---

# Security Guidelines

Follow these security practices to protect the application and user data.

## Environment Variables

- Never commit secrets or API keys to version control
- Use environment variables for sensitive data
- Validate environment variables at startup
- Use different values for development and production
- Document required environment variables

## Input Validation

- Validate and sanitize all user inputs
- Use TypeScript for type-level validation
- Implement server-side validation for API routes
- Sanitize data before rendering
- Protect against XSS attacks

## API Security

- Implement rate limiting for API endpoints
- Validate request origins and methods
- Use proper authentication and authorization
- Sanitize and validate request bodies
- Return appropriate error messages (avoid leaking sensitive info)

## Data Protection

- Never expose sensitive data in client-side code
- Implement proper CORS policies
- Use HTTPS in production
- Hash and salt passwords (if implementing auth)
- Follow principle of least privilege for data access

## Dependencies

- Keep dependencies up-to-date
- Run security audits regularly (npm audit)
- Remove unused dependencies
- Review dependency changes before updating
- Use lock files to ensure consistent installs

## Next.js Security

- Use Next.js built-in CSRF protection
- Implement proper Content Security Policy headers
- Use Server Components to reduce client-side exposure
- Validate data in Server Actions
- Use middleware for authentication checks

## Code Practices

- Avoid eval() and similar dynamic code execution
- Use parameterized queries for databases
- Implement proper error handling (don't leak stack traces)
- Log security events appropriately
- Follow OWASP security guidelines

## Email Security

- Validate email addresses before sending
- Implement rate limiting for contact forms
- Sanitize email content
- Use proper email headers
- Protect against email injection attacks
