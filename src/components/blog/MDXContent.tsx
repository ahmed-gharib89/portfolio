'use client';

import dynamic from 'next/dynamic';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';

// This component will dynamically import the MDX content
const MDXContent = ({ content }: { content: string }) => {
  // For simplicity, we could use a library to parse MDX content as a string,
  // but since Next.js with @next/mdx handles MDX files as pages or components,
  // we might need a different approach. For now, we'll render as plain text or HTML if processed.
  // Ideally, this would be handled by importing MDX files directly, but since content is dynamic,
  // we might need a different strategy.

  // Placeholder for actual MDX rendering logic
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none blog-content">
      {/* This is a placeholder. In a real implementation, MDX content would be processed here. */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default MDXContent;