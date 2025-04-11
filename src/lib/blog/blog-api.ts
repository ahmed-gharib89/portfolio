import { cache } from 'react';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/types/blog';
import { blogPostsInfo } from './blog-data';

/**
 * Gets the content of a blog post from its HTML file
 * @param slug - The unique identifier of the blog post
 * @returns The HTML content of the blog post as a string
 * @throws If the file cannot be read
 */
async function getBlogContentFromFile(slug: string): Promise<string> {
  try {
    // In Node.js environment (SSR)
    const filePath = path.join(process.cwd(), 'public', 'blog-content', `${slug}.html`);
    const content = await fs.promises.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error loading blog content for ${slug}:`, error);
    return `<p>Failed to load blog content. Please try again later.</p>`;
  }
}

/**
 * Get all available blog post slugs
 * @returns An array of all blog post slugs
 */
export const getAllPostSlugs = cache(async () => {
  console.log(`(Server) Fetching all slugs`); // Log for debugging
  return Object.keys(blogPostsInfo);
});

/**
 * Get a blog post by its slug
 * @param slug - The unique identifier of the blog post
 * @returns The blog post data including content, or null if not found
 */
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  console.log(`(Server) Fetching post: ${slug}`); // Log for debugging

  const postInfo = blogPostsInfo[slug as keyof typeof blogPostsInfo];
  if (!postInfo) {
    return null; // Return null if not found
  }

  // Load content from file
  const content = await getBlogContentFromFile(slug);

  // Combine the slug and content with the rest of the post data
  return { ...postInfo, slug, content };
});
