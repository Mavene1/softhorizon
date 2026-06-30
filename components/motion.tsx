"use client";

export {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
  useMotionValue,
  useTransform,
  useSpring,
  LayoutGroup,
  Reorder,
} from "framer-motion";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface FadeUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  children: React.ReactNode;
}

export function FadeUp({ delay = 0, children, ...props }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  children: React.ReactNode;
}

export function StaggerContainer({ staggerDelay = 0.08, children, ...props }: StaggerContainerProps) {
  return (
    <motion.div
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay } },
      }}
      initial="hidden"
      animate="show"
      {...props}
    >
      {children}
    </motion.div>
  );
}
