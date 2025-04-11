'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { fadeInUp } from '@/lib/utils/animation-utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  id,
  className,
  delay = 0.2,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Use the fadeInUp animation with custom delay
  const variants = {
    hidden: fadeInUp.hidden,
    visible: {
      ...fadeInUp.visible,
      transition: {
        ...fadeInUp.visible.transition,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;