import React from 'react';
import { BlogPostMeta } from '@/lib/mdx-utils';

interface BlogJsonLdProps {
  post: BlogPostMeta;
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
    image: post.coverImage ? `https://agharib.com${post.coverImage}` : undefined,
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
