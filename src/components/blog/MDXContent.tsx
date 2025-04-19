'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { MDXComponents } from '../mdx/MDXComponents';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

interface MDXContentProps {
  content: string;
}

const MDXContent: React.FC<MDXContentProps> = ({ content }) => {
  const [renderedContent, setRenderedContent] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const processContent = async () => {
      try {
        setIsLoading(true);
        
        // First approach: Try to render MDX components directly
        // This is a simplified approach that will at least show the content
        // even if the interactive components don't work fully
        
        // Replace component tags with HTML equivalents for basic rendering
        let processedContent = content
          // Replace CodeBlock with pre and code tags
          .replace(/<CodeBlock[^>]*className="([^"]*)"[^>]*>([\s\S]*?)<\/CodeBlock>/g, 
                  '<pre><code class="$1">$2</code></pre>')
          
          // Replace Chart with a div
          .replace(/<Chart[\s\S]*?\/>/g, 
                  '<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-center">Chart Component (Interactive in production)</div>')
          
          // Replace ImageGallery with a div
          .replace(/<ImageGallery[\s\S]*?\/>/g, 
                  '<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-center">Image Gallery Component (Interactive in production)</div>')
          
          // Replace YouTubeEmbed with a div
          .replace(/<YouTubeEmbed[\s\S]*?\/>/g, 
                  '<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-center">YouTube Video Embed (Interactive in production)</div>')
          
          // Replace TwitterEmbed with a div
          .replace(/<TwitterEmbed[\s\S]*?\/>/g, 
                  '<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-center">Twitter Embed (Interactive in production)</div>')
          
          // Replace GistEmbed with a div
          .replace(/<GistEmbed[\s\S]*?\/>/g, 
                  '<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-center">GitHub Gist Embed (Interactive in production)</div>')
          
          // Replace Callout with a div
          .replace(/<Callout[^>]*type="([^"]*)"[^>]*>([\s\S]*?)<\/Callout>/g, 
                  '<div class="p-4 my-4 border-l-4 rounded-r-lg bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-800 dark:text-blue-300">$2</div>');
        
        // Process markdown content with remark
        const result = await remark()
          .use(html)
          .use(remarkGfm)
          .process(processedContent);
        
        setRenderedContent(result.toString());
      } catch (error) {
        console.error('Error processing MDX content:', error);
        setRenderedContent('<p>Error rendering content. Please try again later.</p>');
      } finally {
        setIsLoading(false);
      }
    };

    processContent();
  }, [content]);

  if (isLoading) {
    return <div className="animate-pulse">Loading content...</div>;
  }

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none blog-content">
      <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
    </div>
  );
};

export default MDXContent;
