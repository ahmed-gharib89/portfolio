'use client';

import React from 'react';

interface GistEmbedProps {
  gistId: string;
  username?: string;
  file?: string;
}

const GistEmbed: React.FC<GistEmbedProps> = ({
  gistId,
  username = 'anonymous',
  file = ''
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const gistUrl = `https://gist.github.com/${username}/${gistId}.js${file ? `?file=${file}` : ''}`;
  const gistId_file = `gist-${gistId}${file ? `-${file}` : ''}`;
  
  React.useEffect(() => {
    // Create a script element to load the gist
    const script = document.createElement('script');
    script.src = gistUrl;
    script.id = gistId_file;
    script.onload = () => setLoaded(true);
    
    // Add the script to the document
    document.body.appendChild(script);
    
    // Cleanup function to remove the script when component unmounts
    return () => {
      const scriptElement = document.getElementById(gistId_file);
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [gistUrl, gistId_file]);
  
  return (
    <div className="my-8 gist-embed">
      <div id={`gist-${gistId}`} className="w-full overflow-auto rounded-lg shadow-md"></div>
    </div>
  );
};

export default GistEmbed;
