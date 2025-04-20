'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { ChevronLeft, ChevronRight, Calendar, Clock, Share2, MessageSquare, Copy, Check, ArrowUp, User, Heart, Bookmark, Twitter, Facebook, Linkedin } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogPostLayout from '@/components/blog/BlogPostLayout';
import MDXComponents from '@/components/mdx/MDXComponents';
import BlogJsonLd from '@/components/blog/BlogJsonLd';
import { ErrorBoundary } from 'react-error-boundary';
import { getPostBySlug, getRelatedPosts, getAllPostsMeta } from '@/lib/blog-api';

// Fallback component for error boundary
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
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

interface Heading {
  id: string;
  text: string;
  level: number;
}

// Table of Contents component
function TableOfContents({ headings, activeId, onClick }: { headings: Heading[]; activeId: string; onClick: (id: string) => void }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id} className={`pl-${(heading.level - 1) * 4}`}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(heading.id);
                }}
                className={`block py-1 text-sm border-l-2 pl-3 transition-colors ${
                  activeId === heading.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

interface Comment {
  id: number;
  author: string;
  authorImage: string | null;
  date: string;
  content: string;
  likes: number;
  replies?: Comment[];
}

// Comment component
function CommentSystem({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Jane Smith',
      authorImage: '/assets/images/avatar-1.jpg',
      date: 'April 15, 2025',
      content: 'This article was incredibly insightful! I especially appreciated the section on data lakehouse architecture evolution.',
      likes: 5,
      replies: [
        {
          id: 2,
          author: 'Ahmed Gharib',
          authorImage: '/assets/images/avatar-ahmed.jpg',
          date: 'April 16, 2025',
          content: 'Thank you for your kind words, Jane! I\'m glad you found the article helpful.',
          likes: 2,
        }
      ]
    },
    {
      id: 3,
      author: 'Michael Chen',
      authorImage: '/assets/images/avatar-2.jpg',
      date: 'April 14, 2025',
      content: 'Great overview of the topic. I would love to see a follow-up article that dives deeper into the performance optimization aspects.',
      likes: 3,
      replies: []
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name.trim()) {
      setFormError('Please enter your name');
      return;
    }
    
    if (!email.trim()) {
      setFormError('Please enter your email');
      return;
    }
    
    if (!newComment.trim()) {
      setFormError('Please enter a comment');
      return;
    }
    
    // Simulate submitting comment
    setIsSubmitting(true);
    setFormError('');
    
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        author: name,
        authorImage: null,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        content: newComment,
        likes: 0,
        replies: []
      };
      
      setComments([newCommentObj, ...comments]);
      setNewComment('');
      setName('');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      
      if (comment.replies) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === commentId) {
            return { ...reply, likes: reply.likes + 1 };
          }
          return reply;
        });
        
        return { ...comment, replies: updatedReplies };
      }
      
      return comment;
    }));
  };
  
  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
        <MessageSquare className="h-6 w-6 mr-2" />
        Comments ({comments.reduce((count, comment) => count + 1 + (comment.replies?.length || 0), 0)})
      </h3>
      
      {/* Comment Form */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leave a Comment</h4>
        <form onSubmit={handleSubmitComment}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email * (will not be published)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Comment *
            </label>
            <textarea
              id="comment"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              required
            />
          </div>
          {formError && (
            <p className="text-red-600 dark:text-red-400 mb-4">{formError}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Post Comment'}
          </button>
        </form>
      </div>
      
      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                {comment.authorImage ? (
                  <Image
                    src={comment.authorImage}
                    alt={comment.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <User className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                    {comment.author}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {comment.date}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {comment.content}
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 ml-12 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        {reply.authorImage ? (
                          <Image
                            src={reply.authorImage}
                            alt={reply.author}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <User className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-base font-medium text-gray-900 dark:text-white">
                            {reply.author}
                          </h5>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {reply.date}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          {reply.content}
                        </p>
                        <div className="flex items-center">
                          <button
                            onClick={() => handleLike(reply.id)}
                            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <Heart className="h-3 w-3 mr-1" />
                            <span>{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
}

// Enhanced Author Profile component
function EnhancedAuthorProfile({ 
  author, 
  authorImage, 
  bio, 
  socialLinks 
}: { 
  author: string; 
  authorImage?: string; 
  bio?: string; 
  socialLinks?: SocialLinks 
}) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-6">
            {authorImage ? (
              <Image 
                src={authorImage} 
                alt={author} 
                width={96} 
                height={96} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              'AG'
            )}
          </div>
          <div className="flex-grow text-center md:text-left">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{author}</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {bio || 'Advanced Analytics Engineer with expertise in data engineering, machine learning, and AI integration. Passionate about building scalable data solutions and sharing knowledge with the community.'}
            </p>
            
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks?.twitter && (
                <a 
                  href={socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {socialLinks?.linkedin && (
                <a 
                  href={socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {socialLinks?.github && (
                <a 
                  href={socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  aria-label="GitHub"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Social Sharing component
function SocialSharing({ title, url }: { title: string; url: string }) {
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };
  
  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-500 dark:text-gray-400">Share:</span>
      <a 
        href={shareLinks.twitter} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-5 w-5" />
      </a>
      <a 
        href={shareLinks.facebook} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-5 w-5" />
      </a>
      <a 
        href={shareLinks.linkedin} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-5 w-5" />
      </a>
      <button
        onClick={copyToClipboard}
        className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
        aria-label="Copy link"
      >
        <Copy className="h-5 w-5" />
      </button>
    </div>
  );
}

// Custom MDX components with copy button for code blocks
const CustomMDXComponents = {
  ...MDXComponents,
  pre: ({ children, ...props }: React.HTMLProps<HTMLPreElement>) => {
    const [copied, setCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);
    
    const handleCopy = () => {
      if (preRef.current) {
        const code = preRef.current.textContent;
        if (code) {
          navigator.clipboard.writeText(code)
            .then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
              console.error('Failed to copy code: ', err);
            });
        }
      }
    };
    
    return (
      <div className="relative group">
        <pre ref={preRef} {...props} className="relative">
          {children}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-gray-700 text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    );
  }
};

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags?: string[];
  image?: string;
  excerpt?: string;
  content?: string;
  readingTime?: string;
  featured?: boolean;
  authorImage?: string;
  authorBio?: string;
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [postMeta, setPostMeta] = useState<BlogPost | null>(null);
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [prevPost, setPrevPost] = useState<BlogPost | null>(null);
  const [nextPost, setNextPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<Record<string, HTMLHeadingElement>>({});
  
  // Extract headings from content
  useEffect(() => {
    if (contentRef.current) {
      const headingElements = contentRef.current.querySelectorAll('h2, h3, h4');
      const extractedHeadings: Heading[] = Array.from(headingElements).map(heading => {
        const element = heading as HTMLHeadingElement;
        return {
          id: element.id || element.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '',
          text: element.textContent || '',
          level: parseInt(element.tagName.substring(1))
        };
      });
      
      // Set IDs for headings that don't have them
      headingElements.forEach((heading, index) => {
        const element = heading as HTMLHeadingElement;
        if (!element.id) {
          element.id = extractedHeadings[index].id;
        }
        headingRefs.current[element.id] = element;
      });
      
      setHeadings(extractedHeadings);
    }
  }, [mdxSource, isLoading]);
  
  // Scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };
  
  // Track active heading based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (headings.length === 0) return;
      
      // Calculate reading progress
      if (contentRef.current) {
        const totalHeight = contentRef.current.clientHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const scrolled = (scrollTop / (totalHeight - windowHeight)) * 100;
        setReadingProgress(Math.min(100, Math.max(0, scrolled)));
      }
      
      // Find active heading
      const headingElements = Object.values(headingRefs.current);
      let currentHeading = '';
      
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];
        if (heading && heading.getBoundingClientRect().top <= 150) {
          currentHeading = heading.id;
          break;
        }
      }
      
      if (currentHeading !== activeHeading) {
        setActiveHeading(currentHeading);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings, activeHeading]);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch post data directly from the blog-api
        const post = await getPostBySlug(slug);
        
        if (!post) {
          throw new Error('Post not found');
        }
        
        setPostMeta(post);
        
        // Process MDX content
        if (post.content) {
          const mdxSource = await serialize(post.content, {
            mdxOptions: {
              development: process.env.NODE_ENV === 'development',
            },
          });
          setMdxSource(mdxSource);
        }
        
        // Set related posts
        const relatedPostsData = await getRelatedPosts(slug, 3);
        setRelatedPosts(relatedPostsData);
        
        // Set previous and next posts
        const allPosts = await getAllPostsMeta();
        const currentIndex = allPosts.findIndex(p => p.slug === slug);
        
        if (currentIndex < allPosts.length - 1) {
          setPrevPost(allPosts[currentIndex + 1]);
        }
        
        if (currentIndex > 0) {
          setNextPost(allPosts[currentIndex - 1]);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError((err as Error).message);
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
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      <BlogJsonLd post={postMeta} />
      <Header />
      
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300 ease-out"
        style={{ width: `${readingProgress}%` }}
      ></div>
      
      <main>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <BlogPostLayout
              title={postMeta.title}
              slug={postMeta.slug}
              author={postMeta.author}
              date={postMeta.date}
              readingTime={postMeta.readingTime || '5 min read'}
              category={postMeta.category}
              tags={postMeta.tags || []}
              coverImage={postMeta.image}
            >
              {/* Social Sharing */}
              <div className="mb-8">
                <SocialSharing 
                  title={postMeta.title} 
                  url={`/blog/${postMeta.slug}`} 
                />
              </div>
              
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Table of Contents (Desktop) */}
                <div className="hidden lg:block lg:w-1/4">
                  {headings.length > 0 && (
                    <TableOfContents 
                      headings={headings} 
                      activeId={activeHeading}
                      onClick={scrollToHeading}
                    />
                  )}
                </div>
                
                {/* Main Content */}
                <div className="lg:w-3/4">
                  {/* MDX Content */}
                  <ErrorBoundary
                    FallbackComponent={ErrorFallback}
                    onReset={() => {
                      // Reset the state when the user clicks "Try again"
                      window.location.reload();
                    }}
                  >
                    <div ref={contentRef} className="prose prose-lg dark:prose-invert max-w-none">
                      {mdxSource ? (
                        <MDXRemote {...mdxSource} components={CustomMDXComponents} />
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">
                          Content is being processed...
                        </p>
                      )}
                    </div>
                  </ErrorBoundary>
                  
                  {/* Enhanced Author Profile */}
                  <EnhancedAuthorProfile 
                    author={postMeta.author}
                    authorImage={postMeta.authorImage}
                    bio={postMeta.authorBio}
                    socialLinks={{
                      twitter: 'https://twitter.com/ahmed_gharib89',
                      linkedin: 'https://linkedin.com/in/ahmed-gharib89',
                      github: 'https://github.com/ahmed-gharib89'
                    }}
                  />
                  
                  {/* Comment System */}
                  <CommentSystem postSlug={postMeta.slug} />
                  
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
                              {relatedPost.image && (
                                <div className="h-40 overflow-hidden">
                                  <Image 
                                    src={relatedPost.image} 
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
                </div>
              </div>
            </BlogPostLayout>
          </div>
        </section>
      </main>
      
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-opacity ${
          readingProgress > 20 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      
      <Footer />
    </div>
  );
}
