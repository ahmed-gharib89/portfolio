'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
  caption?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, caption }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="my-8 w-full">
      <div className="relative w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        {/* Main image */}
        <div className="relative aspect-video w-full">
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />
        </div>
        
        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                index === currentIndex ? 'border-blue-500 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              aria-label={`Go to image ${index + 1}`}
            >
              <Image
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Caption */}
      {(caption || images[currentIndex].alt) && (
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
          {caption || images[currentIndex].alt}
        </p>
      )}
    </div>
  );
};

export default ImageGallery;
