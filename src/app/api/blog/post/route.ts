import { NextResponse } from 'next/server';
import { getPost, getRelatedPosts, getAllPostsMeta } from '@/lib/mdx-utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Get the slug from the URL query parameters
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }
    
    // Get the post data
    const post = await getPost(slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Get related posts
    const relatedPosts = getRelatedPosts(slug, 3);
    
    // Get all posts to determine previous and next
    const allPosts = getAllPostsMeta();
    const currentIndex = allPosts.findIndex(p => p.slug === slug);
    
    // Get previous and next posts if they exist
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    
    return NextResponse.json({
      post,
      relatedPosts,
      prevPost,
      nextPost
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
