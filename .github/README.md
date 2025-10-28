# GitHub Copilot Configuration

This directory contains the complete GitHub Copilot configuration for the portfolio project.

## 📁 Structure

```
.github/
├── COPILOT_SETUP.md              # Complete setup and usage guide
├── copilot-instructions.md       # Main project-wide instructions
├── instructions/                 # File-specific coding standards
├── prompts/                      # Reusable task prompts
├── agents/                       # Specialized AI personas
└── workflows/
    └── copilot-setup-steps.yml  # GitHub Actions workflow
```

## 🚀 Quick Links

- **[Setup Guide](COPILOT_SETUP.md)** - Complete guide to using this configuration
- **[Main Instructions](copilot-instructions.md)** - Project overview and core principles

## 📚 Documentation

### Instructions (8 files)

Automatically apply coding standards to specific file types:

- TypeScript, React, Next.js guidelines
- Testing, documentation, security standards
- Performance optimization, code review practices

### Prompts (6 files)

Use with `/` command in Copilot Chat:

- `/setup-component` - Create new components
- `/write-tests` - Generate tests
- `/code-review` - Review code
- `/refactor-code` - Refactor code
- `/generate-docs` - Generate documentation
- `/debug-issue` - Debug and fix issues

### Agents (3 files)

Activate with `@` in Copilot Chat:

- `@architect` - Architecture planning
- `@reviewer` - Code review
- `@debugger` - Debugging assistance

## ✨ Quick Start

1. **Install GitHub Copilot** extension in VS Code
2. **Read the [Setup Guide](COPILOT_SETUP.md)** for detailed instructions
3. **Start using:**
   - Instructions work automatically
   - Use `/` commands for prompts
   - Use `@` for agents

## 🎯 Common Tasks

| Task               | Use This                      |
| ------------------ | ----------------------------- |
| Create a component | `/setup-component`            |
| Write tests        | `/write-tests`                |
| Plan a feature     | `@architect`                  |
| Review code        | `@reviewer` or `/code-review` |
| Fix a bug          | `@debugger` or `/debug-issue` |
| Refactor code      | `/refactor-code`              |
| Write docs         | `/generate-docs`              |

## 🔧 Maintenance

Keep this configuration up-to-date:

- Update instructions as patterns evolve
- Add new prompts for recurring tasks
- Refine agents based on usage
- Share improvements with the team

## 📖 Learn More

- [COPILOT_SETUP.md](COPILOT_SETUP.md) - Detailed setup and usage guide
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [VS Code Copilot](https://code.visualstudio.com/docs/copilot)

---

**Happy coding with GitHub Copilot! 🚀**
