'use client';

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from '../mdx/MDXComponents';

// This component will be used as a wrapper for MDX content
const MDXContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <MDXProvider components={MDXComponents}>
      <div className="prose prose-lg dark:prose-invert max-w-none blog-content">
        {children}
      </div>
    </MDXProvider>
  );
};

export default MDXContent;
