'use client';

import { AnimatePresence, motion, type MotionProps } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const MotionToggle = motion.create('button');

type ThemeToggleProps = {
  className?: string;
  size?: 'sm' | 'md';
} & Pick<MotionProps, 'initial' | 'animate' | 'transition'>;

const ThemeToggle = ({
  className,
  size = 'md',
  initial,
  animate,
  transition,
}: ThemeToggleProps) => {
  const { isDark, toggleTheme, ready } = useTheme();
  const dimensions = size === 'sm' ? 'h-9 w-9' : 'h-10 w-10';

  return (
    <MotionToggle
      type="button"
      onClick={toggleTheme}
      whileTap={ready ? { scale: 0.95 } : undefined}
      disabled={!ready}
      aria-label="Toggle theme"
      initial={initial}
      animate={animate}
      transition={transition}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-card bg-card text-muted-foreground transition-colors duration-300 hover:border-primary/35 hover:cursor-pointer hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 disabled:cursor-not-allowed disabled:opacity-80',
        dimensions,
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Sun className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Moon className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </MotionToggle>
  );
};

export default ThemeToggle;
