import { cache } from 'react';
import fs from 'fs';
import path from 'path';

// Type Definition
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  content: string;
  excerpt?: string;
  readingTime?: string;
  image?: string;
  featured?: boolean;
}

// Meta information for blog posts
// Content is loaded dynamically from HTML files in public/blog-content/
const blogPostsInfo: Record<string, Omit<BlogPost, 'slug' | 'content'>> = {
  'vibe-coding-future-of-development': {
    title: 'Vibe Coding: The Future of Software Development in 2025',
    date: 'April 6, 2025',
    author: 'Ahmed Gharib',
    category: 'AI & Data Engineering',
    excerpt: 'Discover how vibe coding is transforming software development by allowing developers to create applications through natural language prompts and AI-powered code generation.',
    readingTime: '12 min',
    featured: true,
    image: '/assets/images/vibe-coding.jpg',
  },
  'modern-data-engineering-practices': {
    title: 'Modern Data Engineering Practices in 2025',
    date: 'April 1, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Engineering',
  },
  'llms-in-data-pipelines': {
    title: 'Integrating LLMs into Data Engineering Pipelines',
    date: 'March 15, 2025',
    author: 'Ahmed Gharib',
    category: 'AI & Data Engineering',
  },
  'streaming-architecture': {
    title: 'Building Robust Streaming Data Architectures',
    date: 'February 28, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Architecture',
  },
  'the-rise-of-large-action-models': {
    title: 'The Rise of Large Action Models: Redefining AI from Text to Action',
    date: 'April 5, 2025',
    author: 'Ahmed Gharib',
    category: 'AI & Large Action Models',
    readingTime: '15 min',
  },
  'llm-data-extraction': {
    title: 'Using LLMs for Automated Data Extraction and Classification',
    date: 'February 10, 2025',
    author: 'Ahmed Gharib',
    category: 'AI & Data Engineering',
  },
  'data-governance-ai-era': {
    title: 'Data Governance in the AI Era',
    date: 'January 25, 2025',
    author: 'Ahmed Gharib',
    category: 'Data Governance',
  },
  'vector-databases-practical-guide': {
    title: 'Vector Databases: A Practical Guide for Data Engineers',
    date: 'April 3, 2025',
    author: 'Ahmed Gharib',
    readingTime: '11 min',
    category: 'Data Engineering',
    image: '/assets/images/vector-databases.jpg',
    featured: true,
  },
  'multimodal-llms-data-integration': {
    title: 'Multimodal LLMs and Their Impact on Data Integration',
    date: 'March 28, 2025',
    author: 'Ahmed Gharib',
    readingTime: '9 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/multimodal-llms.jpg',
  },
  'synthetic-data-generation-llms': {
    title: 'Synthetic Data Generation Using LLMs for Testing and Development',
    date: 'March 20, 2025',
    author: 'Ahmed Gharib',
    readingTime: '8 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/synthetic-data.jpg',
  },
  'data-lakehouse-architecture-2025': {
    title: 'Data Lakehouse Architecture in 2025: Evolution and Best Practices',
    date: 'March 10, 2025',
    author: 'Ahmed Gharib',
    readingTime: '10 min',
    category: 'Data Architecture',
    image: '/assets/images/data-lakehouse.jpg',
  },
  'real-time-analytics-edge-computing': {
    title: 'Real-time Analytics at the Edge: Architectures and Technologies',
    date: 'March 5, 2025',
    author: 'Ahmed Gharib',
    readingTime: '8 min',
    category: 'Data Architecture',
    image: '/assets/images/edge-computing.jpg',
  },
  'dbt-advanced-techniques': {
    title: 'Advanced dbt Techniques for Modern Data Teams',
    date: 'February 22, 2025',
    author: 'Ahmed Gharib',
    readingTime: '11 min',
    category: 'Data Engineering',
    image: '/assets/images/dbt-advanced.jpg',
  },
  'data-mesh-implementation': {
    title: 'Implementing Data Mesh: Practical Strategies and Challenges',
    date: 'February 15, 2025',
    author: 'Ahmed Gharib',
    readingTime: '14 min',
    category: 'Data Architecture',
    image: '/assets/images/data-mesh.jpg',
  },
  'ai-agents-data-pipeline': {
    title: 'AI Agents for Automated Data Pipeline Management',
    date: 'February 7, 2025',
    author: 'Ahmed Gharib',
    readingTime: '9 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/ai-agents.jpg',
  },
  'prompt-engineering-data-analysis': {
    title: 'Prompt Engineering Techniques for Data Analysis with LLMs',
    date: 'January 30, 2025',
    author: 'Ahmed Gharib',
    readingTime: '8 min',
    category: 'AI & Data Engineering',
    image: '/assets/images/prompt-engineering.jpg',
  },
  'ethical-considerations-ai-data': {
    title: 'Ethical Considerations in AI-Driven Data Engineering',
    date: 'January 20, 2025',
    author: 'Ahmed Gharib',
    readingTime: '7 min',
    category: 'Data Governance',
    image: '/assets/images/ethical-ai.jpg',
  },
  'optimizing-modern-data-stack-dbt-snowflake': {
    title: "Optimizing the Modern Data Stack: Leveraging dbt with Snowflake",
    date: "April 5, 2025",
    author: 'Ahmed Gharib',
    category: 'Data Engineering',
    image: "/assets/images/data-engineering.jpg",
    readingTime: '10 min',
  }
};

/**
 * Gets the content of a blog post from its HTML file
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

// Using React.cache for deduplication within a single request/render
export const getAllPostSlugs = cache(async () => {
  console.log(`(Server) Fetching all slugs`); // Log for debugging
  return Object.keys(blogPostsInfo);
});

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