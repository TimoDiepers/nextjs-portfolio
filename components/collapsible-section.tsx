'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CollapsibleSectionProps = {
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  expandText?: string;
  collapseText?: string;
  className?: string;
};

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  children,
  isExpanded: controlledExpanded,
  onToggle,
  expandText = "Show more",
  collapseText = "Show less",
  className = "",
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  
  const isControlled = controlledExpanded !== undefined;
  const isExpanded = isControlled ? controlledExpanded : internalExpanded;
  
  const handleToggle = () => {
    const newExpanded = !isExpanded;
    if (isControlled) {
      onToggle?.(newExpanded);
    } else {
      setInternalExpanded(newExpanded);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: 'easeInOut',
              opacity: { duration: 0.2 }
            }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex justify-center pt-2">
        <button
          onClick={handleToggle}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full px-3 py-1.5 hover:bg-primary/5"
        >
          {isExpanded ? collapseText : expandText}
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          ) : (
            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CollapsibleSection;