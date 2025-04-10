'use client';

import React, { useState, useEffect } from 'react';

interface ReadingProgressBarProps {
  targetRef: React.RefObject<HTMLElement>;
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ targetRef }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!targetRef.current) return;

      const element = targetRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const windowScrollTop = window.scrollY - element.offsetTop;

      if (windowScrollTop >= 0) {
        const scrolled = Math.min(100, Math.max(0, (windowScrollTop / totalHeight) * 100));
        setReadingProgress(scrolled);
      } else {
        setReadingProgress(0);
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);

  return (
    <div className="sticky top-0 left-0 z-10 w-full h-1 bg-gray-200 dark:bg-gray-700">
      <div
        className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-150 ease-out"
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;
