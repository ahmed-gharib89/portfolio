'use server';

import { getAllBlogPosts, BlogPostMetadata } from './mdx-utils';

/**
 * Search blog posts by query string
 * @param query Search query
 * @returns Filtered blog posts matching the query
 */
export async function searchBlogPosts(query: string): Promise<BlogPostMetadata[]> {
  const allPosts = await getAllBlogPosts();
  
  if (!query || query.trim() === '') {
    return allPosts;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return allPosts.filter(post => {
    const inTitle = post.title.toLowerCase().includes(normalizedQuery);
    const inExcerpt = post.excerpt.toLowerCase().includes(normalizedQuery);
    const inTags = post.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery)) || false;
    
    return inTitle || inExcerpt || inTags;
  });
}

/**
 * Get all unique tags from blog posts
 * @returns Array of unique tags
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllBlogPosts();
  const tagSet = new Set<string>();
  
  allPosts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagSet.add(tag));
    }
  });
  
  return Array.from(tagSet).sort();
}

/**
 * Filter blog posts by tag
 * @param tag Tag to filter by
 * @returns Filtered blog posts with the specified tag
 */
export async function filterPostsByTag(tag: string): Promise<BlogPostMetadata[]> {
  const allPosts = await getAllBlogPosts();
  
  if (!tag || tag === 'All') {
    return allPosts;
  }
  
  return allPosts.filter(post => 
    post.tags?.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}