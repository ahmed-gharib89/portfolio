'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const [copied, setCopied] = useState(false);
  const language = className ? className.replace('language-', '') : '';
  const codeString = React.Children.toArray(children).join('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden">
      <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm flex justify-between items-center">
        <span>{language || 'code'}</span>
        <button
          onClick={copyToClipboard}
          className="text-gray-300 hover:text-white transition-colors p-1 rounded"
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      <pre className="bg-gray-900 p-4 overflow-x-auto">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
