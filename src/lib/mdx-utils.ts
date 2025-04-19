import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Define the blog post metadata interface
export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  authorImage?: string;
  category: string;
  tags?: string[];
  excerpt?: string;
  readingTime?: string;
  coverImage?: string;
  featured?: boolean;
}

// Define the full blog post interface including content
export interface BlogPost extends BlogPostMeta {
  content: string;
  mdxSource?: any;
}

// Path to the MDX content directory
const POSTS_PATH = path.join(process.cwd(), 'src/app/blog/content');

// Simple in-memory cache for blog posts
const postMetaCache = new Map<string, BlogPostMeta>();
const postCache = new Map<string, BlogPost>();
const allPostsMetaCache: { posts: BlogPostMeta[] | null; timestamp: number } = { posts: null, timestamp: 0 };
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Get all MDX files from the content directory
export function getPostSlugs(): string[] {
  try {
    return fs.readdirSync(POSTS_PATH)
      .filter(file => /\.mdx?$/.test(file))
      .map(file => file.replace(/\.mdx?$/, ''));
  } catch (error) {
    console.error('Error reading post slugs:', error);
    return [];
  }
}

// Get post metadata from frontmatter
export function getPostMeta(slug: string): BlogPostMeta | null {
  try {
    // Check cache first
    if (postMetaCache.has(slug)) {
      return postMetaCache.get(slug)!;
    }

    const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    const postMeta = {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      authorImage: data.authorImage,
      category: data.category,
      tags: data.tags,
      excerpt: data.excerpt,
      readingTime: data.readingTime,
      coverImage: data.coverImage,
      featured: data.featured || false,
    };

    // Store in cache
    postMetaCache.set(slug, postMeta);
    
    return postMeta;
  } catch (error) {
    console.error(`Error getting post meta for ${slug}:`, error);
    return null;
  }
}

// Get all posts metadata
export function getAllPostsMeta(): BlogPostMeta[] {
  // Check if we have a valid cached result
  const now = Date.now();
  if (allPostsMetaCache.posts && now - allPostsMetaCache.timestamp < CACHE_TTL) {
    return allPostsMetaCache.posts;
  }

  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostMeta(slug))
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Update cache
  allPostsMetaCache.posts = posts;
  allPostsMetaCache.timestamp = now;
  
  return posts;
}

// Get featured posts
export function getFeaturedPosts(): BlogPostMeta[] {
  return getAllPostsMeta().filter(post => post.featured);
}

// Get post by category
export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPostsMeta().filter(post => post.category === category);
}

// Get post by tag
export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPostsMeta().filter(post => post.tags?.includes(tag));
}

// Get full post content with MDX processing
export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    // Check cache first
    if (postCache.has(slug)) {
      return postCache.get(slug)!;
    }

    const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process MDX content
    const mdxSource = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [
          rehypePrism,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ],
      },
      scope: data,
    });
    
    const post = {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      authorImage: data.authorImage,
      category: data.category,
      tags: data.tags,
      excerpt: data.excerpt,
      readingTime: data.readingTime,
      coverImage: data.coverImage,
      featured: data.featured || false,
      content,
      mdxSource,
    };

    // Store in cache
    postCache.set(slug, post);
    
    return post;
  } catch (error) {
    console.error(`Error getting post for ${slug}:`, error);
    return null;
  }
}

// Calculate estimated reading time
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Get related posts based on category and tags
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPostMeta[] {
  const currentPost = getPostMeta(currentSlug);
  if (!currentPost) return [];
  
  const allPosts = getAllPostsMeta().filter(post => post.slug !== currentSlug);
  
  // Score posts based on matching categories and tags
  const scoredPosts = allPosts.map(post => {
    let score = 0;
    
    // Category match is a strong signal
    if (post.category === currentPost.category) {
      score += 5;
    }
    
    // Tag matches
    if (currentPost.tags && post.tags) {
      const matchingTags = currentPost.tags.filter(tag => post.tags?.includes(tag));
      score += matchingTags.length * 2;
    }
    
    return { post, score };
  });
  
  // Sort by score and return top matches
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}
