'use client';

import React from 'react';

interface TwitterEmbedProps {
  tweetId: string;
  theme?: 'light' | 'dark';
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({
  tweetId,
  theme = 'light'
}) => {
  // Create a reference to the script element
  const [loaded, setLoaded] = React.useState(false);
  
  React.useEffect(() => {
    // Load Twitter widget script if it's not already loaded
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = () => {
        setLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  React.useEffect(() => {
    // Render the tweet when the Twitter widget script is loaded
    if (loaded && window.twttr) {
      window.twttr.widgets.createTweet(
        tweetId,
        document.getElementById(`tweet-container-${tweetId}`),
        {
          theme: theme
        }
      );
    }
  }, [loaded, tweetId, theme]);

  return (
    <div className="my-8 flex justify-center">
      <div 
        id={`tweet-container-${tweetId}`} 
        className="w-full max-w-xl"
      />
    </div>
  );
};

// Add this to the global Window interface
declare global {
  interface Window {
    twttr: any;
  }
}

export default TwitterEmbed;
