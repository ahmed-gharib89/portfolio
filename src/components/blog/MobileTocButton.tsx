'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const TableOfContents = dynamic(() => import('@/components/blog/TableOfContents'), { ssr: false });

interface MobileTocButtonProps {
  contentRef: React.RefObject<HTMLElement>;
}

const MobileTocButton: React.FC<MobileTocButtonProps> = ({ contentRef }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleToc = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md"
        onClick={toggleToc}
      >
        <span className="text-sm font-medium">Contents</span>
      </button>
      
      {/* Mobile TOC (hidden by default) */}
      <div className={`md:hidden mb-6 mt-4 ${isOpen ? 'block' : 'hidden'}`}>
        <TableOfContents contentRef={contentRef} />
      </div>
    </>
  );
};

export default MobileTocButton;
