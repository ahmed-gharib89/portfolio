import React from 'react';
import { BlogPost } from '@/lib/blog-api';

interface BlogJsonLdProps {
  post: BlogPost;
  url: string;
}

const BlogJsonLd: React.FC<BlogJsonLdProps> = ({ post, url }) => {
  // Format the date to ISO format for schema
  const datePublished = new Date(post.date).toISOString();
  
  // Create the schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || `Read about ${post.category}: ${post.title}`,
    image: post.image ? `https://agharib.com${post.image}` : undefined,
    datePublished: datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://agharib.com/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ahmed Gharib',
      logo: {
        '@type': 'ImageObject',
        url: 'https://agharib.com/assets/images/dark.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default BlogJsonLd;
