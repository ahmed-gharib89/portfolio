'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '@/styles/custom-scrollbar.css';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLElement>;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ contentRef }) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // Extract headings from the content
  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Wait a bit for the content to be fully rendered
    const timer = setTimeout(() => {
      if (!contentRef.current) {
        // If contentRef is not set, try to find the article element directly
        const articleElement = document.querySelector('.blog-content') as HTMLElement;
        if (!articleElement) return;

        const headingElements = articleElement.querySelectorAll('h2, h3');

        const items: TOCItem[] = Array.from(headingElements).map((heading) => {
          // If heading doesn't have an id, create one based on text content
          if (!heading.id) {
            const id = heading.textContent?.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '') || `heading-${Math.random().toString(36).substr(2, 9)}`;
            heading.id = id;
          }

          return {
            id: heading.id,
            text: heading.textContent || '',
            level: parseInt(heading.tagName.substring(1)), // Get heading level (2 for h2, 3 for h3)
          };
        });

        setHeadings(items);
      } else {
        const articleElement = contentRef.current;
        const headingElements = articleElement.querySelectorAll('h2, h3');

        const items: TOCItem[] = Array.from(headingElements).map((heading) => {
          // If heading doesn't have an id, create one based on text content
          if (!heading.id) {
            const id = heading.textContent?.toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '') || `heading-${Math.random().toString(36).substr(2, 9)}`;
            heading.id = id;
          }

          return {
            id: heading.id,
            text: heading.textContent || '',
            level: parseInt(heading.tagName.substring(1)), // Get heading level (2 for h2, 3 for h3)
          };
        });

        setHeadings(items);
      }
    }, 500); // Wait 500ms for content to be fully rendered

    return () => clearTimeout(timer);
  }, [contentRef]);

  // Set up intersection observer to highlight active heading
  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Wait a bit for the content to be fully rendered
    const timer = setTimeout(() => {
      let targetElement = contentRef.current;

      // If contentRef is not set, try to find the article element directly
      if (!targetElement) {
        targetElement = document.querySelector('.blog-content') as HTMLElement;
        if (!targetElement) return;
      }

      const handleObserver = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      };

      observer.current = new IntersectionObserver(handleObserver, {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.1,
      });

      const headingElements = targetElement.querySelectorAll('h2, h3');
      headingElements.forEach((element) => observer.current?.observe(element));
    }, 800); // Wait a bit longer than the heading extraction

    return () => {
      clearTimeout(timer);
      observer.current?.disconnect();
    };
  }, [contentRef, headings]);

  // Don't render if there are fewer than 2 headings
  if (headings.length < 2) {
    return null;
  }

  return (
    <div className="relative lg:sticky lg:top-24 w-full lg:w-64 mb-8 lg:mb-0 lg:mr-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div
        className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Table of Contents</h3>
        <button className="text-gray-500 dark:text-gray-400">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {isOpen && (
        <nav className="p-4">
          <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={`${heading.level === 3 ? 'ml-4' : ''}`}
                >
                  <a
                    href={`#${heading.id}`}
                    className={`block py-1 text-sm transition-colors ${
                      activeId === heading.id
                        ? 'text-blue-600 dark:text-blue-400 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
};

export default TableOfContents;
