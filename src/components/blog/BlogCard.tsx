'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { BlogPostMetadata } from '@/lib/blog/mdx-utils';

interface BlogCardProps {
  post: BlogPostMetadata;
  priority?: boolean;
  featured?: boolean;
}

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Estimate reading time (roughly 200 words per minute)
const estimateReadingTime = (excerpt: string) => {
  const wordsPerMinute = 200;
  const wordCount = excerpt.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
};

// Function to generate a placeholder gradient background based on tags
const getTagColor = (tags: string[] | undefined) => {
  if (!tags || tags.length === 0) return 'from-gray-400 to-gray-600';
  
  const tag = tags[0].toLowerCase();
  
  if (tag.includes('data engineering') || tag.includes('beginners')) {
    return 'from-blue-400 to-blue-600';
  } else if (tag.includes('visualization') || tag.includes('analysis')) {
    return 'from-purple-400 to-purple-600';
  } else if (tag.includes('architecture') || tag.includes('career')) {
    return 'from-green-400 to-green-600';
  } else if (tag.includes('dashboard') || tag.includes('governance')) {
    return 'from-amber-400 to-amber-600';
  }
  
  return 'from-gray-400 to-gray-600';
};

export default function BlogCard({ post, priority = false, featured = false }: BlogCardProps) {
  const [imgError, setImgError] = useState(false);
  
  return (
    <Link href={`/blog/${post.slug}`} className="group h-full">
      <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
        <div className={`h-48 bg-gradient-to-br ${getTagColor(post.tags)} relative`}>
          {post.coverImage && !imgError ? (
            <Image 
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority={priority}
              onError={() => setImgError(true)}
            />
          ) : null}
          {featured && (
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-bl">
              Featured
            </div>
          )}
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center mb-2 flex-wrap">
            {post.tags && post.tags.length > 0 && (
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {post.tags[0]}
              </span>
            )}
            <span className="mx-2 text-gray-400">•</span>
            <span className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(post.date)}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {estimateReadingTime(post.excerpt)} read
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Read article →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}