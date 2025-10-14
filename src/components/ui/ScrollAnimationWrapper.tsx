import React from 'react';
import { useScrollAnimation } from '~/hooks/useScrollAnimation';
import { cn } from '~/lib/utils';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'slide-in-left' | 'slide-in-right';
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollAnimationWrapper({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 600,
  className,
}: ScrollAnimationWrapperProps) {
  const { ref, isInView } = useScrollAnimation();

  const variants = {
    'fade-up': {
      initial: 'opacity-0 translate-y-8',
      animate: 'opacity-100 translate-y-0',
    },
    'fade-in': {
      initial: 'opacity-0',
      animate: 'opacity-100',
    },
    'slide-in-left': {
      initial: 'opacity-0 -translate-x-8',
      animate: 'opacity-100 translate-x-0',
    },
    'slide-in-right': {
      initial: 'opacity-0 translate-x-8',
      animate: 'opacity-100 translate-x-0',
    },
  };

  const variantClasses = variants[variant];
  const durationClass = duration <= 300 ? 'duration-300' : duration <= 500 ? 'duration-500' : duration <= 700 ? 'duration-700' : 'duration-1000';

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        durationClass,
        isInView ? variantClasses.animate : variantClasses.initial,
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
