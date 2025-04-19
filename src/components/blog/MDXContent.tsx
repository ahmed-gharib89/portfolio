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

  React.useEffect(() => {
    const processContent = async () => {
      try {
        // Process markdown content with remark
        const processedContent = await remark()
          .use(html)
          .use(remarkGfm)
          .process(content);
        
        setRenderedContent(processedContent.toString());
      } catch (error) {
        console.error('Error processing MDX content:', error);
        setRenderedContent('<p>Error rendering content</p>');
      }
    };

    processContent();
  }, [content]);

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none blog-content">
      <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
    </div>
  );
};

export default MDXContent;
