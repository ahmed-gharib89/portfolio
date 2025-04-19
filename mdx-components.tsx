import React from 'react';
import { MDXComponents } from './src/components/mdx/mdx-components';

// Create a root MDX components file at the project root level
// This is required for Next.js App Router MDX integration
export function useMDXComponents() {
  return MDXComponents;
}
