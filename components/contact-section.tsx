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
      className="space-y-8 border-t border-border/60 pt-16 pb-8"
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
        className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start"
      >
        {/* Email Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Get in touch</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              I&apos;m always open to discussing research collaborations, new opportunities, or interesting projects in sustainability and optimization.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <MotionContactLink
              href="mailto:timo.diepers@rwth-aachen.de"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: 0.6 }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <Mail className="h-4 w-4" />
              Send Email
            </MotionContactLink>
            <span className="text-sm text-muted-foreground font-mono">
              timo.diepers@rwth-aachen.de
            </span>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Follow my work</h3>
          <div className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.map(({ href, label, icon }, index) => (
              <MotionContactLink
                key={`contact-${label}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.7 + index * 0.1 }}
                className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-primary/45 hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                aria-label={label}
              >
                <FontAwesomeIcon icon={icon} className="text-base" />
                {label}
              </MotionContactLink>
            ))}
          </div>
        </div>
      </MotionContactContent>
    </MotionContactSection>
  );
};

export default ContactSection;