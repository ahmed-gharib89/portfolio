/**
 * Consolidated animation utilities to optimize JavaScript loading
 * This reduces initial bundle size by providing a central place for animation logic
 */

// Common animation variants that can be reused across components
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const slideIn = (direction = "left", delay = 0) => {
  const xValue = direction === "left" ? -40 : direction === "right" ? 40 : 0;
  const yValue = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  
  return {
    hidden: { 
      x: xValue,
      y: yValue,
      opacity: 0 
    },
    visible: { 
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.6,
        delay
      }
    }
  };
};

// Custom animation hooks for common animation needs
export const buttonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: 0.2 + (custom * 0.1),
      duration: 0.5
    }
  })
};
