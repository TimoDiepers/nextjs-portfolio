'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faOrcid } from '@fortawesome/free-brands-svg-icons';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionContactSection = motion.create('section');
const MotionContactContent = motion.create('div');
const MotionContactLink = motion.create('a');

const SOCIAL_LINKS = [
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
      className="space-y-6 border-t border-border/60 pt-12"
    >
      <div className="flex items-center gap-3 sm:gap-6">
        <span className="inline-flex pl-2 h-12 w-2 rounded-full bg-chart-2/60" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Contact
          </h2>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Get in touch or follow my work on social platforms.
          </p>
        </div>
      </div>

      <MotionContactContent
        initial={{ opacity: 0, y: 10 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 }}
        className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
      >
        {/* Email Contact */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <MotionContactLink
            href="mailto:timo.diepers@rwth-aachen.de"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_16px_rgba(0,84,159,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,84,159,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Mail className="h-4 w-4" />
            Send Email
          </MotionContactLink>
          <span className="text-sm text-muted-foreground">
            timo.diepers@rwth-aachen.de
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ href, label, icon }, index) => (
            <MotionContactLink
              key={`contact-${label}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: 0.7 + index * 0.1 }}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-primary/45 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              aria-label={label}
            >
              <FontAwesomeIcon icon={icon} className="text-xl" />
            </MotionContactLink>
          ))}
        </div>
      </MotionContactContent>
    </MotionContactSection>
  );
};

export default ContactSection;