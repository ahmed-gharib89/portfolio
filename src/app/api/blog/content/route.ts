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

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    // If slug is provided, return specific post
    if (slug) {
      const filePath = path.join(BLOG_CONTENT_DIR, `${slug}.mdx`);
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      
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
    
    // If no slug, return all posts metadata
    const files = fs.readdirSync(BLOG_CONTENT_DIR);
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
  } catch (error) {
    console.error('Error in blog content API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog content' },
      { status: 500 }
    );
  }
}
