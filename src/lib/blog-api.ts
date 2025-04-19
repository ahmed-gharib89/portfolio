'use client';

import { cache } from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  readingTime?: string;
  image?: string;
  excerpt?: string;
  featured?: boolean;
  content?: string;
  tags?: string[];
}

// Simple in-memory cache for blog posts
const postMetaCache = new Map<string, BlogPost>();
const postCache = new Map<string, BlogPost>();
const allPostsMetaCache: { posts: BlogPost[] | null; timestamp: number } = { posts: null, timestamp: 0 };
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Blog post information
const blogPostsInfo: Record<string, Omit<BlogPost, 'slug' | 'content'>> = {
  'large-action-models': {
    title: 'The Rise of Large Action Models: Redefining AI from Text to Action',
    date: 'April 5, 2025',
    author: 'Ahmed Gharib',
    category: 'AI & Large Action Models',
    readingTime: '15 min',
    image: '/assets/images/large-action-models.jpg',
    excerpt: 'Explore how Large Action Models are transforming AI capabilities from text generation to real-world actions and decision-making.',
    featured: true,
  },
  'llm-data-extraction': {
    title: 'Using LLMs for Automated Data Extraction and Classification',
    date: 'February 10, 2025',
    author: 'Ahmed Gharib',
    category: 'AI & Data Engineering',
    readingTime: '12 min',
    image: '/assets/images/llm-data-extraction.jpg',
    excerpt: 'Learn how to leverage Large Language Models for efficient data extraction and classification from unstructured sources.',
  },
  'data-governance-ai-era': {
    title: 'Data Governance in the AI Era',
    date: 'January 25, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Governance',
    readingTime: '10 min',
    image: '/assets/images/data-governance.jpg',
    excerpt: 'Discover the evolving landscape of data governance as AI adoption accelerates across industries.',
  },
  'vector-databases-practical-guide': {
    title: 'Vector Databases: A Practical Guide for Data Engineers',
    date: 'April 3, 2025',
    author: 'Ahmed Gharib',
    readingTime: '11 min',
    category: 'Data Engineering',
    image: '/assets/images/vector-databases.jpg',
    excerpt: 'A comprehensive guide to understanding, implementing, and optimizing vector databases for modern AI applications.',
    featured: true,
  },
  'multimodal-llms-data-integration': {
    title: 'Multimodal LLMs and Their Impact on Data Integration',
    date: 'March 28, 2025',
    author: 'Ahmed Gharib',
    readingTime: '9 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/multimodal-llms.jpg',
    excerpt: 'Explore how multimodal large language models are revolutionizing data integration across text, images, and other formats.',
  },
  'synthetic-data-generation-llms': {
    title: 'Synthetic Data Generation Using LLMs for Testing and Development',
    date: 'March 20, 2025',
    author: 'Ahmed Gharib',
    readingTime: '8 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/synthetic-data.jpg',
    excerpt: 'Learn techniques for generating high-quality synthetic data using large language models to enhance testing and development.',
  },
  'data-lakehouse-architecture-2025': {
    title: 'Data Lakehouse Architecture in 2025: Evolution and Best Practices',
    date: 'March 10, 2025',
    author: 'Ahmed Gharib',
    readingTime: '10 min',
    category: 'Data Architecture',
    image: '/assets/images/data-lakehouse.jpg',
    excerpt: 'An in-depth look at how data lakehouse architectures have evolved and current best practices for implementation.',
  },
  'real-time-analytics-edge-computing': {
    title: 'Real-time Analytics at the Edge: Architectures and Technologies',
    date: 'March 5, 2025',
    author: 'Ahmed Gharib',
    readingTime: '8 min',
    category: 'Data Architecture',
    image: '/assets/images/edge-computing.jpg',
    excerpt: 'Discover architectures and technologies enabling real-time analytics at the edge for faster insights and reduced latency.',
  },
  'dbt-advanced-techniques': {
    title: 'Advanced dbt Techniques for Modern Data Teams',
    date: 'February 22, 2025',
    author: 'Ahmed Gharib',
    readingTime: '11 min',
    category: 'Data Engineering',
    image: '/assets/images/dbt-advanced.jpg',
    excerpt: 'Master advanced dbt techniques to enhance productivity and code quality in your data transformation workflows.',
    featured: true,
  },
  'data-mesh-implementation': {
    title: 'Implementing Data Mesh: Practical Strategies and Challenges',
    date: 'February 15, 2025',
    author: 'Ahmed Gharib',
    readingTime: '14 min',
    category: 'Data Architecture',
    image: '/assets/images/data-mesh.jpg',
    excerpt: 'A practical guide to implementing data mesh architecture, including strategies for overcoming common challenges.',
  },
  'ai-agents-data-pipeline': {
    title: 'AI Agents for Automated Data Pipeline Management',
    date: 'February 7, 2025',
    author: 'Ahmed Gharib',
    readingTime: '9 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/ai-agents.jpg',
    excerpt: 'Explore how AI agents can automate and optimize data pipeline management for increased efficiency and reliability.',
  },
  'prompt-engineering-data-analysis': {
    title: 'Prompt Engineering Techniques for Data Analysis with LLMs',
    date: 'January 30, 2025',
    author: 'Ahmed Gharib',
    readingTime: '8 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/prompt-engineering.jpg',
    excerpt: 'Learn effective prompt engineering techniques to enhance data analysis workflows using large language models.',
  },
  'ethical-considerations-ai-data': {
    title: 'Ethical Considerations in AI-Driven Data Engineering',
    date: 'January 20, 2025',
    author: 'Ahmed Gharib',
    readingTime: '7 min',
    category: 'Data Governance',
    image: '/assets/images/ethical-ai.jpg',
    excerpt: 'An exploration of ethical considerations and best practices for responsible AI-driven data engineering.',
  },
  'optimizing-modern-data-stack-dbt-snowflake': {
    title: "Optimizing the Modern Data Stack: Leveraging dbt with Snowflake",
    date: "April 5, 2025",
    author: 'Ahmed Gharib',
    category: 'Data Engineering',
    image: "/assets/images/data-engineering.jpg",
    readingTime: '10 min',
    excerpt: 'Discover optimization techniques for the modern data stack, with a focus on dbt and Snowflake integration.',
  },
  'streaming-data-processing-frameworks': {
    title: 'Comparing Modern Streaming Data Processing Frameworks',
    date: 'January 15, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Engineering',
    readingTime: '13 min',
    image: '/assets/images/streaming-data.jpg',
    excerpt: 'A comprehensive comparison of modern streaming data processing frameworks including Kafka Streams, Flink, and Spark Structured Streaming.',
  }
};

// Mock content for blog posts
const mockBlogContent = `
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
export const getAllPostSlugs = cache(async () => {
  console.log(`Fetching all slugs`); // Log for debugging
  return Object.keys(blogPostsInfo);
});

export const getAllPostsMeta = cache(async (): Promise<BlogPost[]> => {
  console.log(`Fetching all posts metadata`); // Log for debugging
  
  // Check cache first
  const now = Date.now();
  if (allPostsMetaCache.posts && now - allPostsMetaCache.timestamp < CACHE_TTL) {
    return allPostsMetaCache.posts;
  }
  
  // Get all slugs
  const slugs = await getAllPostSlugs();
  
  // Create posts with metadata
  const posts = slugs.map(slug => {
    const postInfo = blogPostsInfo[slug];
    return {
      slug,
      ...postInfo
    };
  });
  
  // Update cache
  allPostsMetaCache.posts = posts;
  allPostsMetaCache.timestamp = now;
  
  return posts;
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  console.log(`Fetching post: ${slug}`); // Log for debugging
  
  // Check cache first
  if (postCache.has(slug)) {
    return postCache.get(slug)!;
  }
  
  const postInfo = blogPostsInfo[slug as keyof typeof blogPostsInfo];
  if (!postInfo) {
    return null; // Return null if not found
  }
  
  // Use mock content instead of file system
  const content = mockBlogContent;
  
  // Combine the slug and content with the rest of the post data
  const post = { ...postInfo, slug, content };
  
  // Store in cache
  postCache.set(slug, post);
  
  return post;
});

export const getRelatedPosts = (currentSlug: string, count: number = 3): BlogPost[] => {
  // Get all slugs except current
  const slugs = Object.keys(blogPostsInfo).filter(slug => slug !== currentSlug);
  
  // Get current post category
  const currentPost = blogPostsInfo[currentSlug as keyof typeof blogPostsInfo];
  if (!currentPost) return [];
  
  // First, get posts with the same category
  const sameCategoryPosts = slugs
    .filter(slug => blogPostsInfo[slug].category === currentPost.category)
    .map(slug => ({ slug, ...blogPostsInfo[slug] }));
  
  // If we have enough same-category posts, return them
  if (sameCategoryPosts.length >= count) {
    return sameCategoryPosts.slice(0, count);
  }
  
  // Otherwise, add posts from other categories to reach the desired count
  const otherPosts = slugs
    .filter(slug => blogPostsInfo[slug].category !== currentPost.category)
    .map(slug => ({ slug, ...blogPostsInfo[slug] }));
  
  return [...sameCategoryPosts, ...otherPosts].slice(0, count);
};

export const getPost = async (slug: string): Promise<BlogPost | null> => {
  // Check cache first
  if (postMetaCache.has(slug)) {
    return postMetaCache.get(slug)!;
  }
  
  const postInfo = blogPostsInfo[slug as keyof typeof blogPostsInfo];
  if (!postInfo) {
    return null; // Return null if not found
  }
  
  // Combine the slug with the rest of the post data
  const post = { ...postInfo, slug };
  
  // Store in cache
  postMetaCache.set(slug, post);
  
  return post;
};
