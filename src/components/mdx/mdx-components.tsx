import React from 'react';
import CodeBlock from './CodeBlock';
import YouTubeEmbed from './YouTubeEmbed';
import TwitterEmbed from './TwitterEmbed';
import GistEmbed from './GistEmbed';
import Chart from './Chart';
import ImageGallery from './ImageGallery';

// Define the MDX components mapping
export const MDXComponents = {
  // Custom components
  CodeBlock,
  YouTubeEmbed,
  TwitterEmbed,
  GistEmbed,
  Chart,
  ImageGallery,
  
  // HTML element overrides
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-bold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="my-4" {...props} />,
  a: (props: any) => <a className="text-blue-600 hover:underline dark:text-blue-400" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 my-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 my-4" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4" {...props} />
  ),
  code: (props: any) => {
    const { children, className } = props;
    // If it has a className, it's a code block, otherwise it's inline code
    if (className) {
      return <code className={className} {...props} />;
    }
    return <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props} />;
  },
  pre: (props: any) => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-auto" {...props} />,
  img: (props: any) => <img className="max-w-full h-auto rounded-lg my-4" {...props} />,
  table: (props: any) => <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 my-4" {...props} />,
  th: (props: any) => <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" {...props} />,
  td: (props: any) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400" {...props} />,
  tr: (props: any) => <tr className="bg-white dark:bg-gray-900 even:bg-gray-50 dark:even:bg-gray-800" {...props} />,
  hr: (props: any) => <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />,
};

// This function is used by Next.js MDX integration
export function useMDXComponents(components: any) {
  return {
    ...components,
    ...MDXComponents,
  };
}
