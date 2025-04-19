import { BlogPostMeta } from '@/lib/mdx-utils';
import { Metadata } from 'next';

// Define the metadata for the blog index page
export const metadata: Metadata = {
  title: 'Blog | Ahmed Gharib',
  description: 'Articles and insights on data engineering, AI, and software development by Ahmed Gharib.',
  alternates: {
    canonical: 'https://agharib.com/blog'
  },
};

// Export metadata function for dynamic metadata generation
export function generateBlogMetadata(posts: BlogPostMeta[]): Metadata {
  // Extract categories and tags for SEO
  const categories = [...new Set(posts.map(post => post.category))];
  const tags = [...new Set(posts.flatMap(post => post.tags || []))];
  
  return {
    keywords: [...categories, ...tags],
    openGraph: {
      title: 'Blog | Ahmed Gharib',
      description: 'Articles and insights on data engineering, AI, and software development by Ahmed Gharib.',
      url: 'https://agharib.com/blog',
      type: 'website',
      images: [
        {
          url: 'https://agharib.com/assets/images/blog-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Ahmed Gharib Blog',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | Ahmed Gharib',
      description: 'Articles and insights on data engineering, AI, and software development by Ahmed Gharib.',
      images: ['https://agharib.com/assets/images/blog-og.jpg'],
    },
  };
}
