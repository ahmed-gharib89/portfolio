'use client';
import React, { useRef, useEffect } from 'react';
import ReadingProgressBar from './ReadingProgressBar';
import TableOfContents from './TableOfContents';
import SocialShare from './SocialShare';
import MobileActions from './MobileActions';

interface BlogPostLayoutProps {
  title: string;
  slug?: string;
  author: string;
  date: string;
  readingTime: string;
  category: string;
  tags?: string[];
  coverImage?: string;
  children: React.ReactNode;
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({ 
  title, 
  slug = '', 
  author,
  date,
  readingTime,
  category,
  tags,
  coverImage,
  children 
}) => {
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
            {/* Blog Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
              </h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-4 mb-4">
                <span>{date}</span>
                <span>•</span>
                <span>{readingTime}</span>
                <span>•</span>
                <span>{category}</span>
              </div>
              
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
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
