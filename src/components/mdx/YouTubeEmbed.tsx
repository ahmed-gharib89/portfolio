'use client';

import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  width?: number;
  height?: number;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title = 'YouTube video player',
  width = 560,
  height = 315
}) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
  return (
    <div className="my-8 w-full flex justify-center">
      <div className="w-full max-w-3xl aspect-video">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeEmbed;
