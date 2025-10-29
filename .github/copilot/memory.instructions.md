---
applyTo: '**'
---

<memories hint="Manage via memory tool">
<memory path="/memories/refactoring-progress.md">
# Portfolio Refactoring Progress

## User Decisions (2025-10-29)
1. **Blog format**: Migrate to MDX files in `/content/blog/`
2. **TypeScript strict mode**: Enable incrementally (recommended approach)
3. **Component architecture**: Keep as client-side components (no Server Component conversion)

## Current Phase
IMPLEMENTING - Step 1: Cleaning unused code

## Key Findings from Analysis
- **572 lines** in blog/page.tsx (needs splitting)
- **2165 lines** in blog-api.ts (migrate to MDX)
- **53+ occurrences** of repeated className patterns
- **~600-800 lines** potential reduction through DRY
- Unused file: `src/lib_cv-utils.ts` (DELETE)
- Unused CSS classes in `custom.css` (~100 lines)

## Implementation Order (Once Approved)
1. Clean unused code
2. Create data layer
3. Build UI components
4. Extract utilities
5. Refactor complex components
6. Consolidate styling
7. Setup MDX infrastructure
8. Enable TypeScript strict mode incrementally

</memory>
</memories>
