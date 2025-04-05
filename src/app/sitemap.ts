import { getAllBlogPosts } from '@/lib/blog/mdx-utils';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmedgharib.com';
  
  // Get all blog posts
  const posts = await getAllBlogPosts();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  // Static routes with last modified date
  const routes = [
    '',
    '/about',
    '/projects',
    '/experience',
    '/contact',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...routes, ...blogUrls];
}