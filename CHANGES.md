# MDX Blog Refactoring Changes

## Overview
This update refactors the blog section of the portfolio website to use MDX for content rendering. The implementation includes custom MDX components, enhanced metadata structure, and improved file organization.

## Changes Made

### Configuration
- Updated `next.config.js` to properly support MDX with necessary plugins and configuration
- Added required dependencies for MDX processing

### File Structure
- Created a new directory structure for MDX content at `src/app/blog/content/`
- Organized MDX components in `src/components/mdx/`

### MDX Components
- Created custom MDX components with rich styling in `MDXComponents.tsx`
- Implemented components for:
  - Headings (h1-h4)
  - Paragraphs
  - Links (internal/external detection)
  - Images with captions
  - Blockquotes
  - Code blocks with syntax highlighting
  - Lists (ordered and unordered)
  - Tables
  - Custom callouts (info, warning, error)

### Metadata Structure
- Enhanced blog post metadata structure with additional fields:
  - Tags array
  - Author image
  - Cover image
  - Reading time
  - Excerpt
  - Featured flag

### Blog API
- Created `mdx-utils.ts` with functions for:
  - Getting post metadata from frontmatter
  - Reading and processing MDX content
  - Listing all posts
  - Finding related posts
  - Filtering posts by category or tag
  - Calculating reading time

### Sample Content
- Converted two blog posts to MDX format as examples:
  - "Vibe Coding: The Future of Software Development in 2025"
  - "Vector Databases: A Practical Guide for Data Engineers"

### Blog Post Rendering
- Updated the blog post page component to render MDX content
- Enhanced the blog post layout with:
  - Tags display
  - Author information
  - Related posts section
  - Previous/next navigation

## Testing
- Verified MDX rendering works correctly
- Confirmed blog post navigation functions properly
- Tested responsive design on different viewport sizes

## Next Steps
- Convert remaining blog posts to MDX format
- Consider adding more interactive MDX components
- Implement full-text search for blog content
