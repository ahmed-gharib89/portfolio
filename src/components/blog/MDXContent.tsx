'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXComponents } from '../mdx/MDXComponents';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { MDXProvider } from '@mdx-js/react';

interface MDXContentProps {
  content: string;
}

const MDXContent: React.FC<MDXContentProps> = ({ content }) => {
  const [mdxSource, setMdxSource] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const processContent = async () => {
      try {
        setIsLoading(true);
        
        // Process MDX content with next-mdx-remote
        const mdxSource = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypePrism,
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            ],
            development: false,
          },
          parseFrontmatter: true,
          // Create an empty scope object to avoid parsing issues with expressions
          scope: {},
        });
        
        setMdxSource(mdxSource);
        setError(null);
      } catch (error) {
        console.error('Error processing MDX content:', error);
        
        // If serialization fails, fall back to the regex replacement approach
        try {
          // Replace component tags with HTML equivalents for basic rendering
          let processedContent = content
            // Replace CodeBlock with pre and code tags
            .replace(/<CodeBlock[^>]*className="([^"]*)"[^>]*>([\s\S]*?)<\/CodeBlock>/g, 
                    '<pre><code class="$1">$2</code></pre>')
            
            // Replace Chart with a div
            .replace(/<Chart[\s\S]*?data=\{(\[[\s\S]*?\])\}[\s\S]*?\/>/g, 
                    '<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-center">Chart Component (Interactive in production)</div>')
            
            // Replace ImageGallery with a div
            .replace(/<ImageGallery[\s\S]*?images=\{(\[[\s\S]*?\])\}[\s\S]*?\/>/g, 
                    '<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-center">Image Gallery Component (Interactive in production)</div>')
            
            // Replace YouTubeEmbed with a div
            .replace(/<YouTubeEmbed[\s\S]*?id="([^"]*)"[\s\S]*?\/>/g, 
                    '<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-center">YouTube Video: $1 (Interactive in production)</div>')
            
            // Replace TwitterEmbed with a div
            .replace(/<TwitterEmbed[\s\S]*?tweetId="([^"]*)"[\s\S]*?\/>/g, 
                    '<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-center">Twitter Tweet: $1 (Interactive in production)</div>')
            
            // Replace GistEmbed with a div
            .replace(/<GistEmbed[\s\S]*?id="([^"]*)"[\s\S]*?\/>/g, 
                    '<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-center">GitHub Gist: $1 (Interactive in production)</div>')
            
            // Replace Callout with a div
            .replace(/<Callout[^>]*type="([^"]*)"[^>]*>([\s\S]*?)<\/Callout>/g, 
                    '<div class="p-4 my-4 border-l-4 rounded-r-lg bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-800 dark:text-blue-300">$2</div>');
          
          // Create a simplified MDX source object for the fallback content
          setMdxSource({
            compiledSource: '',
            frontmatter: {},
            scope: {},
            fallbackContent: processedContent
          });
          setError(null);
        } catch (fallbackError) {
          console.error('Error with fallback processing:', fallbackError);
          setError('Error rendering content. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    processContent();
  }, [content]);

  if (isLoading) {
    return <div className="animate-pulse">Loading content...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // If we have fallback content, render it directly with dangerouslySetInnerHTML
  if (mdxSource && mdxSource.fallbackContent) {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none blog-content">
        <div dangerouslySetInnerHTML={{ __html: mdxSource.fallbackContent }} />
      </div>
    );
  }

  // Otherwise, use MDXRemote with the MDXComponents
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none blog-content">
      <MDXProvider components={MDXComponents}>
        {mdxSource ? (
          <MDXRemote {...mdxSource} components={MDXComponents} />
        ) : (
          <div>No content available</div>
        )}
      </MDXProvider>
    </div>
  );
};

export default MDXContent;
