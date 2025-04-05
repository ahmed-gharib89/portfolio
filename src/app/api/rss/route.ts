import { getAllBlogPosts } from '@/lib/blog/mdx-utils';
import { NextResponse } from 'next/server';

export async function GET() {
  // Add await to properly resolve the Promise
  const posts = await getAllBlogPosts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmedgharib.com';
  
  // Generate RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ahmed Gharib's Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Insights on Data Engineering, Analytics, and AI Technologies</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${baseUrl}/blog/${post.slug}</link>
        <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt}]]></description>
        ${post.tags ? post.tags.map((tag) => `<category>${tag}</category>`).join('') : ''}
      </item>
    `
      )
      .join('')}
  </channel>
</rss>`;

  // Return the RSS feed as XML
  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}