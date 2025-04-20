import { cache } from 'react';

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

// Sample blog posts data - this will be used as fallback if API fails
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
  // ... other sample posts
];

// Using React.cache for deduplication within a single request/render
export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  console.log(`Fetching all slugs from API`);
  
  try {
    // Use absolute URL for server-side rendering
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/blog/content`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts = await response.json() as BlogPost[];
    return posts.map(post => post.slug);
  } catch (error) {
    console.error('Error fetching all post slugs:', error);
    // Return slugs from sample data as fallback
    return sampleBlogPosts.map(post => post.slug);
  }
});

export const getAllPostsMeta = cache(async (): Promise<BlogPost[]> => {
  console.log(`Fetching all posts metadata from API`);
  
  // Check cache first
  const now = Date.now();
  if (allPostsMetaCache.posts && now - allPostsMetaCache.timestamp < CACHE_TTL) {
    return allPostsMetaCache.posts;
  }
  
  try {
    // Use absolute URL for server-side rendering
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/blog/content`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts = await response.json() as BlogPost[];
    
    // Update cache
    allPostsMetaCache.posts = posts;
    allPostsMetaCache.timestamp = now;
    
    // Also update individual post cache
    posts.forEach(post => {
      postMetaCache.set(post.slug, post);
    });
    
    return posts;
  } catch (error) {
    console.error('Error fetching all posts metadata:', error);
    // Return sample data as fallback
    return sampleBlogPosts;
  }
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  console.log(`Fetching post from API: ${slug}`);
  
  // Check cache first
  if (postCache.has(slug)) {
    return postCache.get(slug)!;
  }
  
  try {
    // Use absolute URL for server-side rendering
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/blog/content?slug=${slug}`, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        // Try to find in sample data
        const samplePost = sampleBlogPosts.find(post => post.slug === slug);
        if (samplePost) {
          return {
            ...samplePost,
            content: `# ${samplePost.title}\n\n${samplePost.excerpt}\n\n## Introduction\n\nThis is a sample blog post content that is displayed when the actual MDX file cannot be found.\n\n## Main Content\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.\n\n## Conclusion\n\nThank you for reading this sample blog post. In a real implementation, this would be loaded from an MDX file.`
          };
        }
        return null;
      }
      throw new Error(`Failed to fetch post: ${response.status}`);
    }
    
    const post = await response.json() as BlogPost;
    
    // Store in cache
    postCache.set(slug, post);
    
    return post;
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    
    // Try to find in sample data
    const samplePost = sampleBlogPosts.find(post => post.slug === slug);
    if (samplePost) {
      return {
        ...samplePost,
        content: `# ${samplePost.title}\n\n${samplePost.excerpt}\n\n## Introduction\n\nThis is a sample blog post content that is displayed when the actual MDX file cannot be found or there was an error fetching it.\n\n## Main Content\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.\n\n## Conclusion\n\nThank you for reading this sample blog post. In a real implementation, this would be loaded from an MDX file.`
      };
    }
    
    return null;
  }
});

export const getRelatedPosts = async (currentSlug: string, count: number = 3): Promise<BlogPost[]> => {
  try {
    // Get all posts
    const allPosts = await getAllPostsMeta();
    
    // Find current post
    const currentPost = allPosts.find(post => post.slug === currentSlug);
    if (!currentPost) return [];
    
    // First, get posts with the same category
    const sameCategoryPosts = allPosts
      .filter(post => post.slug !== currentSlug && post.category === currentPost.category);
    
    // If we have enough same-category posts, return them
    if (sameCategoryPosts.length >= count) {
      return sameCategoryPosts.slice(0, count);
    }
    
    // Otherwise, add posts from other categories to reach the desired count
    const otherPosts = allPosts
      .filter(post => post.slug !== currentSlug && post.category !== currentPost.category);
    
    return [...sameCategoryPosts, ...otherPosts].slice(0, count);
  } catch (error) {
    console.error('Error getting related posts:', error);
    return [];
  }
};

export const getFeaturedPosts = async (count: number = 3): Promise<BlogPost[]> => {
  try {
    const allPosts = await getAllPostsMeta();
    
    // First try to get posts explicitly marked as featured
    const featuredPosts = allPosts.filter(post => post.featured);
    
    // If we have enough featured posts, return them
    if (featuredPosts.length >= count) {
      return featuredPosts.slice(0, count);
    }
    
    // Otherwise, use the most recent posts to fill up to the desired count
    return allPosts.slice(0, count);
  } catch (error) {
    console.error('Error getting featured posts:', error);
    // Return sample featured posts as fallback
    return sampleBlogPosts.filter(post => post.featured).slice(0, count);
  }
};

export const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    const allPosts = await getAllPostsMeta();
    return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
  } catch (error) {
    console.error('Error getting posts by category:', error);
    return sampleBlogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
  }
};

export const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  try {
    const allPosts = await getAllPostsMeta();
    return allPosts.filter(post => post.tags?.some(t => t.toLowerCase() === tag.toLowerCase()));
  } catch (error) {
    console.error('Error getting posts by tag:', error);
    return sampleBlogPosts.filter(post => post.tags?.some(t => t.toLowerCase() === tag.toLowerCase()));
  }
};

export const getAllCategories = async (): Promise<string[]> => {
  try {
    const allPosts = await getAllPostsMeta();
    const categories = new Set(allPosts.map(post => post.category));
    return Array.from(categories);
  } catch (error) {
    console.error('Error getting all categories:', error);
    const categories = new Set(sampleBlogPosts.map(post => post.category));
    return Array.from(categories);
  }
};

export const getAllTags = async (): Promise<{ tag: string; count: number }[]> => {
  try {
    const allPosts = await getAllPostsMeta();
    
    // Count occurrences of each tag
    const tagCounts: Record<string, number> = {};
    
    allPosts.forEach(post => {
      post.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    // Convert to array of objects
    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error('Error getting all tags:', error);
    
    // Count occurrences of each tag in sample data
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
  }
};

// For API route
export const getPost = async (slug: string): Promise<BlogPost | null> => {
  return getPostBySlug(slug);
};
