'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Directory where blog posts are stored
const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog');

export type BlogPostMetadata = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
};

/**
 * Get all blog post slugs
 */
export async function getBlogPostSlugs(): Promise<string[]> {
  return fs.readdirSync(POSTS_DIRECTORY)
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => filename.replace(/\.mdx$/, ''));
}

/**
 * Get blog post metadata by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostMetadata & { content: string }> {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Parse the front matter
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    content,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    coverImage: data.coverImage as string | undefined,
    tags: (data.tags as string[]) || [],
  };
}

/**
 * Get all blog posts with metadata
 */
export async function getAllBlogPosts(): Promise<BlogPostMetadata[]> {
  const slugs = await getBlogPostSlugs();
  
  const postsPromises = slugs.map(slug => getBlogPostBySlug(slug));
  const posts = await Promise.all(postsPromises);
  
  return posts
    .sort((post1, post2) => (new Date(post2.date).getTime() - new Date(post1.date).getTime()))
    .map(({ slug, title, date, excerpt, coverImage, tags }) => ({
      slug,
      title,
      date,
      excerpt,
      coverImage,
      tags,
    }));
}

/**
 * Get related posts based on tags
 * @param currentSlug - The slug of the current post to exclude from results
 * @param tags - Array of tags to match against
 * @param limit - Maximum number of related posts to return
 * @returns Array of related blog posts
 */
export async function getRelatedPosts(currentSlug: string, tags: string[] = [], limit: number = 3): Promise<BlogPostMetadata[]> {
  const allPosts = await getAllBlogPosts();
  
  // Filter out the current post and posts without tags
  const otherPosts = allPosts.filter(post => 
    post.slug !== currentSlug && 
    post.tags && 
    post.tags.length > 0
  );
  
  // If no tags to match or no other posts, return latest posts
  if (!tags.length || !otherPosts.length) {
    return otherPosts.slice(0, limit);
  }
  
  // Calculate relevance score for each post based on tag matches
  const scoredPosts = otherPosts.map(post => {
    const matchingTags = post.tags?.filter(tag => 
      tags.some(t => t.toLowerCase() === tag.toLowerCase())
    ) || [];
    
    return {
      post,
      score: matchingTags.length,
    };
  });
  
  // Sort by score (descending) and then by date (newest first)
  scoredPosts.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
  });
  
  // Return the top matching posts
  return scoredPosts.slice(0, limit).map(item => item.post);
}