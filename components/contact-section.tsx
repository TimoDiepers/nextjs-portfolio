'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faOrcid } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const MotionContactSection = motion.create('section');
const MotionContactContent = motion.create('div');
const MotionContactLink = motion.create('a');

const SOCIAL_LINKS = [
  { href: 'mailto:timo.diepers@rwth-aachen.de', label: 'Mail', icon: faEnvelope },
  { href: 'https://github.com/TimoDiepers', label: 'GitHub', icon: faGithub },
  { href: 'https://www.linkedin.com/in/timo-diepers/', label: 'LinkedIn', icon: faLinkedinIn },
  { href: 'https://orcid.org/0009-0002-8566-8618', label: 'ORCID', icon: faOrcid },
];

type ContactSectionProps = {
  isReady?: boolean;
};

const ContactSection: React.FC<ContactSectionProps> = ({ isReady = false }) => {
  return (
    <MotionContactSection
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      className="space-y-8 border-t border-border/60 pt-20 pb-8 mt-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-6">
        <span className="inline-flex pl-2 h-12 w-2 rounded-full bg-chart-2/60" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Contact
          </h2>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Let&apos;s connect and discuss opportunities to collaborate.
          </p>
        </div>
      </div>

      {/* Content */}
      <MotionContactContent
        initial={{ opacity: 0, y: 10 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 }}
        className="flex flex-wrap gap-3"
      >
        {SOCIAL_LINKS.map(({ href, label, icon }, index) => (
          <MotionContactLink
            key={`contact-${label}`}
            href={href}
            target={label === 'Mail' ? undefined : '_blank'}
            rel={label === 'Mail' ? undefined : 'noopener noreferrer'}
            initial={{ opacity: 0, y: 10 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.6 + index * 0.1 }}
            className="inline-flex items-center gap-2 rounded-lg bg-card px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-card/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label={label}
          >
            <FontAwesomeIcon icon={icon} className="text-base" />
            {label}
          </MotionContactLink>
        ))}
      </MotionContactContent>
    </MotionContactSection>
  );
};

export default ContactSection;