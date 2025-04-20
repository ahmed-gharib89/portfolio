import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Path to blog content directory
const BLOG_CONTENT_DIR = path.join(process.cwd(), 'src/app/blog/content');

// Helper function to calculate reading time
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Make this route dynamic to avoid static generation errors
export const dynamic = 'force-dynamic';

// Sample blog posts data - this will be used as fallback if file reading fails
const sampleBlogPosts = [
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

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    // First try to read from actual files
    try {
      // If slug is provided, return specific post
      if (slug) {
        const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`);
        
        // Check if file exists
        if (fs.existsSync(filePath)) {
          // Read file content
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const { data: metadata, content } = matter(fileContent);
          
          // Calculate reading time if not provided
          const readingTime = metadata.readingTime || calculateReadingTime(content);
          
          return NextResponse.json({
            slug,
            title: metadata.title || 'Untitled Post',
            date: metadata.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            author: metadata.author || 'Ahmed Gharib',
            category: metadata.category || 'Uncategorized',
            tags: metadata.tags || [],
            image: metadata.image || '/assets/images/default-blog.jpg',
            excerpt: metadata.excerpt || content.substring(0, 150).trim() + '...',
            content,
            readingTime,
            featured: metadata.featured || false,
            authorImage: metadata.authorImage,
            authorBio: metadata.authorBio,
          });
        }
        
        // If file doesn't exist, find in sample data
        const samplePost = sampleBlogPosts.find(post => post.slug === slug);
        if (samplePost) {
          return NextResponse.json({
            ...samplePost,
            content: sampleBlogContent.replace('This is a sample blog post', samplePost.title)
          });
        }
        
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      
      // If no slug, try to read all posts from files
      if (fs.existsSync(BLOG_CONTENT_DIR)) {
        const files = fs.readdirSync(BLOG_CONTENT_DIR);
        if (files.length > 0) {
          const posts = files
            .filter(filename => filename.endsWith('.mdx'))
            .map(filename => {
              const slug = filename.replace(/\.mdx$/, '');
              const filePath = path.join(BLOG_CONTENT_DIR, filename);
              const fileContent = fs.readFileSync(filePath, 'utf8');
              const { data: metadata, content } = matter(fileContent);
              
              // Calculate reading time if not provided
              const readingTime = metadata.readingTime || calculateReadingTime(content);
              
              return {
                slug,
                title: metadata.title || 'Untitled Post',
                date: metadata.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                author: metadata.author || 'Ahmed Gharib',
                category: metadata.category || 'Uncategorized',
                tags: metadata.tags || [],
                image: metadata.image || '/assets/images/default-blog.jpg',
                excerpt: metadata.excerpt || content.substring(0, 150).trim() + '...',
                readingTime,
                featured: metadata.featured || false,
              };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          
          return NextResponse.json(posts);
        }
      }
    } catch (fileError) {
      console.error('Error reading from files, falling back to sample data:', fileError);
      // Continue to fallback data
    }
    
    // Fallback to sample data
    if (slug) {
      const samplePost = sampleBlogPosts.find(post => post.slug === slug);
      if (samplePost) {
        return NextResponse.json({
          ...samplePost,
          content: sampleBlogContent.replace('This is a sample blog post', samplePost.title)
        });
      }
      
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Return all sample posts
    return NextResponse.json(sampleBlogPosts);
    
  } catch (error) {
    console.error('Error in blog content API:', error);
    
    // Even in case of error, return sample data as fallback
    const slug = new URL(request.url).searchParams.get('slug');
    
    if (slug) {
      const samplePost = sampleBlogPosts.find(post => post.slug === slug);
      if (samplePost) {
        return NextResponse.json({
          ...samplePost,
          content: sampleBlogContent.replace('This is a sample blog post', samplePost.title)
        });
      }
    }
    
    return NextResponse.json(sampleBlogPosts);
  }
}
