'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export default function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  // Extract headings from the article
  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const elements = Array.from(article.querySelectorAll('h1, h2, h3, h4'));
    if (elements.length === 0) return;

    const items = elements
      .filter(element => element.id)
      .map(element => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1)),
      }));

    setHeadings(items);
  }, []);

  // Track the active heading based on scroll position
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0,
      }
    );

    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  // If no headings, don't render anything
  if (headings.length === 0) return null;

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm ${className}`}>
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2 text-gray-900 dark:text-white font-medium">
          <BookOpen className="h-4 w-4" />
          <span>Table of Contents</span>
        </div>
        <button className="text-gray-500 dark:text-gray-400">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      
      {isOpen && (
        <nav className="p-4 pt-0">
          <ul className="space-y-1">
            {headings.map(heading => (
              <li 
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
              >
                <a
                  href={`#${heading.id}`}
                  className={`block py-1 px-2 text-sm rounded-md transition-colors ${
                    activeId === heading.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${heading.id}`)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}