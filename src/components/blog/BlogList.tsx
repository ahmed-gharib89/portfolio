'use client';

import React, { useState } from 'react';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogCard from '@/components/blog/BlogCard';
import { BlogPostMetadata } from '@/lib/blog/mdx-utils';

interface BlogListProps {
  initialPosts: BlogPostMetadata[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Blog Search Component */}
          <BlogSearch 
            initialPosts={initialPosts} 
            onSearchResults={setFilteredPosts} 
          />
          
          {/* Blog Post Grid */}
          {filteredPosts.length > 0 ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  All Articles
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}