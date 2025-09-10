import type { Variants } from 'framer-motion';

// Container animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Item animations
export const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Slide animations
export const slideInFromRight: Variants = {
  hidden: { x: 300, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      damping: 30, 
      stiffness: 300 
    }
  },
  exit: {
    x: 300,
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const slideInFromLeft: Variants = {
  hidden: { x: -300, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      damping: 30, 
      stiffness: 300 
    }
  },
  exit: {
    x: -300,
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Scale animations
export const scaleVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

// Blur fade animation
export const blurFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Tree node animations
export const treeNodeVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (level: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      delay: level * 0.05,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

// Edit field animations
export const editFieldVariants: Variants = {
  display: {
    scale: 1,
    transition: { duration: 0.2 }
  },
  editing: {
    scale: 1.02,
    boxShadow: '0 0 0 3px rgb(59 130 246 / 0.1)',
    transition: { duration: 0.2 }
  }
};

// Button hover animations
export const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { 
      duration: 0.1,
      ease: "easeOut" 
    }
  },
  tap: { 
    scale: 0.98,
    transition: { 
      duration: 0.05 
    }
  }
};