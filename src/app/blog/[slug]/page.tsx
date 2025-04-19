// This is now a React Server Component
import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/animation/AnimatedSection';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPostSlugs, getPostMeta, getRelatedPosts } from '@/lib/mdx-utils';
import BlogJsonLd from '@/components/blog/BlogJsonLd';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Client components need to be dynamically imported
const BlogPostLayout = dynamic(() => import('@/components/blog/BlogPostLayout'), { ssr: false });
const SocialShare = dynamic(() => import('@/components/blog/SocialShare'), { ssr: false });
const MDXContent = dynamic(() => import('@/components/blog/MDXContent'), { ssr: false });

// --- SSG Implementation ---

// Generate static paths at build time
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Ensure only statically generated paths are allowed (optional, for full SSG)
export const dynamicParams = false;

// --- Metadata Generation ---

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostMeta(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `Read about ${post.category}: ${post.title}. Written by ${post.author} on ${post.date}.`,
    alternates: {
      canonical: `https://agharib.com/blog/${params.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://agharib.com/blog/${params.slug}`,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

// --- Page Component (React Server Component) ---

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params; // Get slug from params passed by Next.js

  // Fetch current post data server-side
  const postMeta = getPostMeta(slug);

  // Handle post not found server-side
  if (!postMeta) {
    notFound(); // Trigger 404 page
  }

  // Read MDX content directly
  const contentPath = path.join(process.cwd(), 'src/app/blog/content', `${slug}.mdx`);
  let content = '';
  try {
    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const { content: mdxContent } = matter(fileContents);
    content = mdxContent;
  } catch (error) {
    console.error(`Error reading MDX file for ${slug}:`, error);
  }

  // Fetch all slugs to determine next/previous posts
  const slugs = getPostSlugs();
  const currentIndex = slugs.findIndex(s => s === slug);

  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null;

  // Fetch titles for prev/next posts
  const prevPostMeta = prevSlug ? getPostMeta(prevSlug) : null;
  const nextPostMeta = nextSlug ? getPostMeta(nextSlug) : null;

  const prevPost = prevPostMeta ? { slug: prevPostMeta.slug, title: prevPostMeta.title } : null;
  const nextPost = nextPostMeta ? { slug: nextPostMeta.slug, title: nextPostMeta.title } : null;

  // Get related posts
  const relatedPosts = getRelatedPosts(slug, 3);

  // Get the canonical URL for the blog post
  const baseUrl = 'https://agharib.com';
  const canonicalUrl = `${baseUrl}/blog/${slug}`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Add JSON-LD for SEO */}
      <BlogJsonLd post={postMeta} url={canonicalUrl} />

      <Header />

      <main className="pt-24 pb-16">
        <AnimatedSection className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
            >
              ← Back to all articles
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                  {postMeta.category}
                </span>
                {postMeta.tags && postMeta.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {postMeta.tags.map(tag => (
                      <span key={tag} className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {postMeta.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between mb-8">
                <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{postMeta.date}</span>
                  </div>
                  {postMeta.readingTime && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{postMeta.readingTime}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span>By {postMeta.author}</span>
                  </div>
                </div>

                {/* Social Share - Both Desktop and Mobile */}
                <div>
                  <SocialShare title={postMeta.title} slug={slug} />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <BlogPostLayout title={postMeta.title} slug={slug}>
              {postMeta.coverImage && (
                <div className="mb-8 rounded-lg overflow-hidden relative h-96">
                  <Image
                    src={postMeta.coverImage}
                    alt={postMeta.title}
                    width={1200}
                    height={630}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <article className="prose prose-lg dark:prose-invert max-w-none blog-content">
                {/* Use the MDXContent component to render the content */}
                <MDXContent content={content} />
              </article>

              {/* Tags */}
              {postMeta.tags && postMeta.tags.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {postMeta.tags.map(tag => (
                      <Link 
                        key={tag} 
                        href={`/blog?tag=${tag}`}
                        className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author info */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  About the Author
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl font-bold">
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
                        <ChevronLeft className="h-5 w-5 mr-2" />
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
                        <ChevronRight className="h-5 w-5 ml-2" />
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
