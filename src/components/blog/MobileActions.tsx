'use client';

import React from 'react';
import SocialShare from './SocialShare';
import BookmarkButton from './BookmarkButton';
import MobileTocButton from './MobileTocButton';

interface MobileActionsProps {
  title: string;
  slug: string;
  contentRef: React.RefObject<HTMLElement>;
}

const MobileActions: React.FC<MobileActionsProps> = ({ title, slug, contentRef }) => {
  return (
    <div className="md:hidden">
      <div className="flex justify-between mb-6">
        <MobileTocButton contentRef={contentRef} />

        <div className="flex items-center space-x-2">
          <BookmarkButton />
        </div>
      </div>
    </div>
  );
};

export default MobileActions;
