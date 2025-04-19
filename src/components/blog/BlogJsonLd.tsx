'use client';
import React from 'react';

interface BlogPostMeta {
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

interface BlogJsonLdProps {
  post: BlogPostMeta;
}

const BlogJsonLd: React.FC<BlogJsonLdProps> = ({ post }) => {
  // Create the structured data for the blog post
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    image: post.coverImage || 'https://agharib.com/assets/images/default-blog-image.jpg',
    url: `https://agharib.com/blog/${post.slug}`,
    description: post.excerpt || '',
    keywords: post.tags?.join(', ') || '',
    publisher: {
      '@type': 'Organization',
      name: 'Ahmed Gharib',
      logo: {
        '@type': 'ImageObject',
        url: 'https://agharib.com/assets/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://agharib.com/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default BlogJsonLd;
