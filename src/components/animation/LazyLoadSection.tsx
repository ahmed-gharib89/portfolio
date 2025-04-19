'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Lazy load components for better performance
const LazyLoadSection = ({ children, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold]);

  return (
    <div ref={sectionRef} className="w-full">
      {isVisible ? children : <div className="min-h-[200px]" />}
    </div>
  );
};

export default LazyLoadSection;
