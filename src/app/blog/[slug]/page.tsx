'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogPostLayout from '@/components/blog/BlogPostLayout';
import MDXComponents from '@/components/mdx/MDXComponents';
import BlogJsonLd from '@/components/blog/BlogJsonLd';
import { ErrorBoundary } from 'react-error-boundary';

// Fallback component for error boundary
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg my-8 text-center">
      <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">
        Something went wrong loading this content
      </h2>
      <p className="text-red-600 dark:text-red-300 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

export default function BlogPost({ params }) {
  const { slug } = params;
  const [postMeta, setPostMeta] = useState(null);
  const [mdxSource, setMdxSource] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch post data
        const response = await fetch(`/api/blog/post?slug=${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        
        const data = await response.json();
        
        if (data.post) {
          setPostMeta(data.post);
          
          // Process MDX content
          if (data.post.content) {
            const mdxSource = await serialize(data.post.content, {
              mdxOptions: {
                development: process.env.NODE_ENV === 'development',
              },
            });
            setMdxSource(mdxSource);
          }
          
          // Set related posts
          if (data.relatedPosts) {
            setRelatedPosts(data.relatedPosts);
          }
          
          // Set previous and next posts
          if (data.prevPost) {
            setPrevPost(data.prevPost);
          }
          
          if (data.nextPost) {
            setNextPost(data.nextPost);
          }
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main>
          <div className="container mx-auto px-4 py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-12"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main>
          <div className="container mx-auto px-4 py-12">
            <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-lg text-center">
              <h1 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">
                Error Loading Blog Post
              </h1>
              <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
              <Link 
                href="/blog" 
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Return to Blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!postMeta) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main>
          <div className="container mx-auto px-4 py-12">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-8 rounded-lg text-center">
              <h1 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400 mb-4">
                Blog Post Not Found
              </h1>
              <p className="text-yellow-600 dark:text-yellow-300 mb-6">
                The blog post you're looking for doesn't exist or has been moved.
              </p>
              <Link 
                href="/blog" 
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Return to Blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BlogJsonLd post={postMeta} />
      <Header />
      
      <main>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <BlogPostLayout
              title={postMeta.title}
              date={postMeta.date}
              author={postMeta.author}
              readingTime={postMeta.readingTime}
              category={postMeta.category}
              tags={postMeta.tags}
              coverImage={postMeta.coverImage}
            >
              {/* MDX Content */}
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                  // Reset the state when the user clicks "Try again"
                  window.location.reload();
                }}
              >
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {mdxSource ? (
                    <MDXRemote {...mdxSource} components={MDXComponents} />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300">
                      Content is being processed...
                    </p>
                  )}
                </div>
              </ErrorBoundary>
              
              {/* Author Bio */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {postMeta.authorImage ? (
                      <Image 
                        src={postMeta.authorImage} 
                        alt={postMeta.author} 
                        width={64} 
                        height={64} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      'AG'
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">{postMeta.author}</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Advanced Analytics Engineer with expertise in data engineering, machine learning, and AI integration.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Related Articles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map(relatedPost => (
                      <Link 
                        key={relatedPost.slug} 
                        href={`/blog/${relatedPost.slug}`}
                        className="group"
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-transform transform group-hover:scale-[1.02]">
                          {relatedPost.coverImage && (
                            <div className="h-40 overflow-hidden">
                              <Image 
                                src={relatedPost.coverImage} 
                                alt={relatedPost.title} 
                                width={400} 
                                height={225}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="p-4 flex-grow">
                            <span className="text-sm text-blue-600 dark:text-blue-400">{relatedPost.category}</span>
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                              {relatedPost.date} • {relatedPost.readingTime || '5 min read'}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Previous/Next article navigation */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row justify-between">
                  {prevPost && (
                    <Link href={`/blog/${prevPost.slug}`} className="group mb-4 md:mb-0">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <ChevronLeft className="h-5 w-5 mr-2" aria-hidden="true" />
                        <div>
                          <div className="text-sm">Previous Article</div>
                          <div className="text-base font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {prevPost.title}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                  {nextPost && (
                    <Link href={`/blog/${nextPost.slug}`} className="group md:text-right">
                      <div className="flex items-center justify-end text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <div>
                          <div className="text-sm">Next Article</div>
                          <div className="text-base font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {nextPost.title}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 ml-2" aria-hidden="true" />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </BlogPostLayout>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
