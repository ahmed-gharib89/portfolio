'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { BlogPostMetadata } from '@/lib/blog/mdx-utils';

interface BlogSearchProps {
  initialPosts: BlogPostMetadata[];
  onSearchResults: (posts: BlogPostMetadata[]) => void;
}

export default function BlogSearch({ initialPosts, onSearchResults }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [tags, setTags] = useState<string[]>(['All']);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique tags from the initial posts
  useEffect(() => {
    const tagSet = new Set<string>();
    initialPosts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tagSet.add(tag));
      }
    });
    setTags(['All', ...Array.from(tagSet).sort()]);
  }, [initialPosts]);

  // Handle search and filtering
  useEffect(() => {
    let filteredPosts: BlogPostMetadata[] = initialPosts;
    
    // Apply tag filter if not 'All'
    if (selectedTag !== 'All') {
      filteredPosts = initialPosts.filter(post => 
        post.tags?.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
      );
    }
    
    // Apply search query if provided
    if (searchQuery.trim() !== '') {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      filteredPosts = filteredPosts.filter(post => {
        return (
          post.title.toLowerCase().includes(normalizedQuery) ||
          post.excerpt.toLowerCase().includes(normalizedQuery) ||
          post.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery))
        );
      });
    }
    
    onSearchResults(filteredPosts);
  }, [searchQuery, selectedTag, initialPosts, onSearchResults]);

  // Clear search query
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTag('All');
    setIsFilterOpen(false);
  };

  return (
    <div className="mb-10 space-y-4">
      {/* Search bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles..."
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
        >
          <Filter className="w-4 h-4" />
          <span>Filter by tag</span>
        </button>
        
        {selectedTag !== 'All' && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg">
            <span>{selectedTag}</span>
            <button onClick={() => setSelectedTag('All')}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {(searchQuery || selectedTag !== 'All') && (
          <button
            onClick={resetFilters}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Clear all filters
          </button>
        )}
      </div>
      
      {/* Tag filter panel */}
      {isFilterOpen && (
        <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Filter by tag</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTag === tag
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}