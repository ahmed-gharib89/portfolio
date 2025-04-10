'use client';

import React, { useRef, useEffect } from 'react';
import ReadingProgressBar from './ReadingProgressBar';
import TableOfContents from './TableOfContents';
import SocialShare from './SocialShare';
import MobileActions from './MobileActions';

interface BlogPostLayoutProps {
  title: string;
  slug: string;
  children: React.ReactNode;
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ title, slug, children }) => {
  const contentRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Set up refs after component mounts
  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Find the article element with class 'blog-content'
      const articleElement = document.querySelector('.blog-content') as HTMLElement;
      if (articleElement) {
        contentRef.current = articleElement;
      }

      // Find the main element
      const mainElement = document.querySelector('main') as HTMLElement;
      if (mainElement) {
        mainRef.current = mainElement;
      }
    }
  }, []);

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar targetRef={mainRef} />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Table of Contents - Desktop */}
        <div className="hidden lg:block lg:w-1/4">
          <TableOfContents contentRef={contentRef} />
        </div>

        <div className="w-full lg:w-3/4 relative">

          <div className="max-w-4xl">
            {/* Mobile Actions - Client Component */}
            <MobileActions
              title={title}
              slug={slug}
              contentRef={contentRef}
            />

            {/* Blog Content */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostLayout;
