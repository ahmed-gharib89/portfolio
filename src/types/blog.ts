/**
 * Represents a blog post in the application
 */
export interface BlogPost {
  /** Unique identifier/slug for the blog post */
  slug: string;
  
  /** Title of the blog post */
  title: string;
  
  /** Publication date in string format */
  date: string;
  
  /** Author of the blog post */
  author: string;
  
  /** Category of the blog post */
  category: string;
  
  /** HTML content of the blog post */
  content: string;
  
  /** Short excerpt/summary of the blog post */
  excerpt?: string;
  
  /** Estimated reading time */
  readingTime?: string;
  
  /** Path to the blog post's featured image */
  image?: string;
  
  /** Whether the post is featured on the homepage */
  featured?: boolean;
}
