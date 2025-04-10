'use client';

import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';

const BookmarkButton: React.FC = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real implementation, you would save this to localStorage or a database
  };

  return (
    <button 
      className={`flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-800 p-2 rounded-md ${
        isBookmarked ? 'text-blue-600 dark:text-blue-400' : ''
      }`}
      onClick={toggleBookmark}
      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this article"}
    >
      <Bookmark className="h-5 w-5" />
    </button>
  );
};

export default BookmarkButton;
