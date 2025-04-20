import { cache } from 'react';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags?: string[];
  image?: string;
  excerpt?: string;
  content?: string;
  readingTime?: string;
  featured?: boolean;
  authorImage?: string;
  authorBio?: string;
}

// Cache TTL in milliseconds (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

// Cache for all posts metadata
const allPostsMetaCache: {
  posts: BlogPost[] | null;
  timestamp: number;
} = {
  posts: null,
  timestamp: 0,
};

// Cache for individual post metadata
const postMetaCache = new Map<string, BlogPost>();

// Cache for full post content
const postCache = new Map<string, BlogPost>();

// Helper function to calculate reading time
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Sample blog posts data - this will be used as fallback if file reading fails
const sampleBlogPosts: BlogPost[] = [
  {
    slug: 'data-lakehouse-architecture-2025',
    title: 'Data Lakehouse Architecture in 2025: Evolution and Best Practices',
    date: 'April 18, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Architecture',
    tags: ['Data Lakehouse', 'Architecture', 'Best Practices'],
    image: '/assets/images/data-lakehouse.jpg',
    excerpt: 'Explore the evolution of data lakehouse architecture and best practices for implementation in 2025.',
    readingTime: '8 min read',
    featured: true,
  },
  {
    slug: 'ai-agents-data-pipeline',
    title: 'AI Agents in Data Pipeline Orchestration',
    date: 'April 15, 2025',
    author: 'Ahmed Gharib',
    category: 'AI',
    tags: ['AI Agents', 'Data Pipeline', 'Orchestration'],
    image: '/assets/images/ai-agents.jpg',
    excerpt: 'How AI agents are revolutionizing data pipeline orchestration and management.',
    readingTime: '6 min read',
    featured: true,
  },
  {
    slug: 'data-mesh-implementation',
    title: 'Practical Data Mesh Implementation: Lessons from the Field',
    date: 'April 10, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Architecture',
    tags: ['Data Mesh', 'Implementation', 'Case Study'],
    image: '/assets/images/data-mesh.jpg',
    excerpt: 'Real-world lessons and practical advice for implementing data mesh architecture.',
    readingTime: '10 min read',
    featured: true,
  },
  {
    slug: 'dbt-advanced-techniques',
    title: 'Advanced dbt Techniques for Complex Data Transformations',
    date: 'April 5, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Engineering',
    tags: ['dbt', 'Data Transformation', 'SQL'],
    image: '/assets/images/dbt.jpg',
    excerpt: 'Advanced techniques for handling complex data transformations with dbt.',
    readingTime: '12 min read',
  },
  {
    slug: 'llm-data-extraction',
    title: 'Using LLMs for Automated Data Extraction and Enrichment',
    date: 'March 28, 2025',
    author: 'Ahmed Gharib',
    category: 'AI',
    tags: ['LLM', 'Data Extraction', 'Automation'],
    image: '/assets/images/llm-extraction.jpg',
    excerpt: 'How to leverage large language models for automated data extraction and enrichment.',
    readingTime: '9 min read',
  },
  {
    slug: 'real-time-analytics-edge-computing',
    title: 'Real-time Analytics at the Edge: Architectures and Patterns',
    date: 'March 20, 2025',
    author: 'Ahmed Gharib',
    category: 'Analytics',
    tags: ['Real-time', 'Edge Computing', 'Analytics'],
    image: '/assets/images/edge-computing.jpg',
    excerpt: 'Architectures and patterns for implementing real-time analytics at the edge.',
    readingTime: '11 min read',
  },
  {
    slug: 'data-governance-ai-era',
    title: 'Data Governance in the AI Era: New Challenges and Solutions',
    date: 'March 15, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Governance',
    tags: ['Data Governance', 'AI', 'Compliance'],
    image: '/assets/images/data-governance.jpg',
    excerpt: 'Navigating the new challenges of data governance in the era of AI and machine learning.',
    readingTime: '7 min read',
  },
  {
    slug: 'ethical-considerations-ai-data',
    title: 'Ethical Considerations in AI-Driven Data Engineering',
    date: 'March 10, 2025',
    author: 'Ahmed Gharib',
    category: 'Ethics',
    tags: ['Ethics', 'AI', 'Data Engineering'],
    image: '/assets/images/ethical-ai.jpg',
    excerpt: 'An exploration of ethical considerations and best practices for responsible AI-driven data engineering.',
    readingTime: '8 min read',
  },
  {
    slug: 'streaming-architecture',
    title: 'Modern Streaming Architecture: Beyond Kafka',
    date: 'March 5, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Architecture',
    tags: ['Streaming', 'Kafka', 'Architecture'],
    image: '/assets/images/streaming.jpg',
    excerpt: 'Exploring modern streaming architectures that go beyond traditional Kafka implementations.',
    readingTime: '10 min read',
  },
  {
    slug: 'vector-databases-practical-guide',
    title: 'A Practical Guide to Vector Databases for AI Applications',
    date: 'February 28, 2025',
    author: 'Ahmed Gharib',
    category: 'Databases',
    tags: ['Vector Databases', 'AI', 'Implementation'],
    image: '/assets/images/vector-db.jpg',
    excerpt: 'A hands-on guide to implementing and optimizing vector databases for AI applications.',
    readingTime: '13 min read',
  },
  {
    slug: 'synthetic-data-generation-llms',
    title: 'Synthetic Data Generation with LLMs: Techniques and Use Cases',
    date: 'February 20, 2025',
    author: 'Ahmed Gharib',
    category: 'AI',
    tags: ['Synthetic Data', 'LLM', 'Data Generation'],
    image: '/assets/images/synthetic-data.jpg',
    excerpt: 'How to use large language models for generating high-quality synthetic data for various use cases.',
    readingTime: '9 min read',
  },
  {
    slug: 'prompt-engineering-data-analysis',
    title: 'Prompt Engineering for Data Analysis: Best Practices',
    date: 'February 15, 2025',
    author: 'Ahmed Gharib',
    category: 'AI',
    tags: ['Prompt Engineering', 'Data Analysis', 'LLM'],
    image: '/assets/images/prompt-engineering.jpg',
    excerpt: 'Best practices for prompt engineering to get the most out of LLMs for data analysis tasks.',
    readingTime: '7 min read',
  },
  {
    slug: 'the-rise-of-large-action-models',
    title: 'The Rise of Large Action Models: Beyond Language Understanding',
    date: 'February 10, 2025',
    author: 'Ahmed Gharib',
    category: 'AI',
    tags: ['Large Action Models', 'AI', 'Future Trends'],
    image: '/assets/images/action-models.jpg',
    excerpt: 'Exploring the emergence of large action models and their potential impact on AI applications.',
    readingTime: '11 min read',
  },
  {
    slug: 'manus-ai-revolutionizing-productivity',
    title: 'How Manus AI is Revolutionizing Knowledge Worker Productivity',
    date: 'February 5, 2025',
    author: 'Ahmed Gharib',
    category: 'AI',
    tags: ['Manus AI', 'Productivity', 'Knowledge Work'],
    image: '/assets/images/manus-ai.jpg',
    excerpt: 'An in-depth look at how Manus AI is transforming productivity for knowledge workers.',
    readingTime: '8 min read',
  },
  {
    slug: 'vibe-coding-future-of-development',
    title: 'Vibe Coding: The Future of Software Development',
    date: 'January 30, 2025',
    author: 'Ahmed Gharib',
    category: 'Software Development',
    tags: ['Vibe Coding', 'Future', 'Development'],
    image: '/assets/images/vibe-coding.jpg',
    excerpt: 'Exploring the concept of vibe coding and how it might shape the future of software development.',
    readingTime: '9 min read',
  }
];

// Sample blog post content - this will be used as fallback if file reading fails
const sampleBlogContent = `
# This is a sample blog post

This is placeholder content for the blog post. In a real implementation, this would be loaded from MDX files.

## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.

## Main Content

Sed euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.

## Conclusion

Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl. Sed euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.
`;

// Using React.cache for deduplication within a single request/render
export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  console.log(`Fetching all slugs`);
  
  // Return slugs from sample data
  return sampleBlogPosts.map(post => post.slug);
});

export const getAllPostsMeta = cache(async (): Promise<BlogPost[]> => {
  console.log(`Fetching all posts metadata`);
  
  // Check cache first
  const now = Date.now();
  if (allPostsMetaCache.posts && now - allPostsMetaCache.timestamp < CACHE_TTL) {
    return allPostsMetaCache.posts;
  }
  
  try {
    // Return sample blog posts
    const posts = [...sampleBlogPosts];
    
    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    // Update cache
    allPostsMetaCache.posts = sortedPosts;
    allPostsMetaCache.timestamp = now;
    
    return sortedPosts;
  } catch (error) {
    console.error('Error getting all posts metadata:', error);
    return [];
  }
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  console.log(`Fetching post: ${slug}`);
  
  // Check cache first
  if (postCache.has(slug)) {
    return postCache.get(slug)!;
  }
  
  try {
    // Find post in sample data
    const post = sampleBlogPosts.find(p => p.slug === slug);
    
    if (!post) {
      return null;
    }
    
    // Add content to post
    const postWithContent = {
      ...post,
      content: sampleBlogContent
    };
    
    // Store in cache
    postCache.set(slug, postWithContent);
    
    return postWithContent;
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
});

export const getRelatedPosts = (currentSlug: string, count: number = 3): BlogPost[] => {
  // Find current post
  const currentPost = sampleBlogPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) {
    return [];
  }
  
  // First, get posts with the same category
  const sameCategoryPosts = sampleBlogPosts
    .filter(post => post.slug !== currentSlug && post.category === currentPost.category);
  
  // If we have enough same-category posts, return them
  if (sameCategoryPosts.length >= count) {
    return sameCategoryPosts.slice(0, count);
  }
  
  // Otherwise, add posts from other categories to reach the desired count
  const otherPosts = sampleBlogPosts
    .filter(post => post.slug !== currentSlug && post.category !== currentPost.category);
  
  return [...sameCategoryPosts, ...otherPosts].slice(0, count);
};

export const getFeaturedPosts = async (count: number = 3): Promise<BlogPost[]> => {
  // First try to get posts explicitly marked as featured
  const featuredPosts = sampleBlogPosts.filter(post => post.featured);
  
  // If we have enough featured posts, return them
  if (featuredPosts.length >= count) {
    return featuredPosts.slice(0, count);
  }
  
  // Otherwise, use the most recent posts to fill up to the desired count
  return sampleBlogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  return sampleBlogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};

export const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  return sampleBlogPosts.filter(post => post.tags?.some(t => t.toLowerCase() === tag.toLowerCase()));
};

export const getAllCategories = async (): Promise<string[]> => {
  const categories = new Set(sampleBlogPosts.map(post => post.category));
  return Array.from(categories);
};

export const getAllTags = async (): Promise<{ tag: string; count: number }[]> => {
  // Count occurrences of each tag
  const tagCounts: Record<string, number> = {};
  
  sampleBlogPosts.forEach(post => {
    post.tags?.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  // Convert to array of objects
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
};

// For API route
export const getPost = async (slug: string): Promise<BlogPost | null> => {
  return getPostBySlug(slug);
};
