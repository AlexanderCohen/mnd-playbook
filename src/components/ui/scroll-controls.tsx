'use client';

import * as React from 'react';
import { ChevronsUp, ChevronUp, ChevronDown, ChevronsDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ScrollControlsProps {
  /**
   * The ref of the scrollable container element
   */
  containerRef: React.RefObject<HTMLElement | null>;

  /**
   * Position of the controls
   * @default 'right'
   */
  position?: 'left' | 'right';

  /**
   * Amount to scroll for Up/Down buttons (in pixels)
   * @default 200
   */
  scrollAmount?: number;

  /**
   * Custom className for the controls container
   */
  className?: string;

  /**
   * Show/hide controls based on scroll position
   * @default true
   */
  autoHide?: boolean;
}

export function ScrollControls({
  containerRef,
  position = 'right',
  scrollAmount = 200,
  className,
  autoHide = true,
}: ScrollControlsProps) {
  const [canScrollUp, setCanScrollUp] = React.useState(false);
  const [canScrollDown, setCanScrollDown] = React.useState(false);

  // Check scroll position to enable/disable buttons
  const checkScrollPosition = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    setCanScrollUp(scrollTop > 0);
    setCanScrollDown(scrollTop < scrollHeight - clientHeight - 10);
  }, [containerRef]);

  // Monitor scroll events
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener('scroll', checkScrollPosition);

    // Also check on resize
    const resizeObserver = new ResizeObserver(checkScrollPosition);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      resizeObserver.disconnect();
    };
  }, [containerRef, checkScrollPosition]);

  const scrollTo = (type: 'top' | 'up' | 'down' | 'bottom') => {
    const container = containerRef.current;
    if (!container) return;

    switch (type) {
      case 'top':
        container.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'up':
        container.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        break;
      case 'down':
        container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        break;
      case 'bottom':
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        break;
    }
  };

  // Hide controls if auto-hide is enabled and can't scroll
  if (autoHide && !canScrollUp && !canScrollDown) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed z-40 flex flex-col gap-2',
        // Position on screen
        'top-1/2 -translate-y-1/2',
        position === 'right' ? 'right-2 md:right-4' : 'left-2 md:left-4',
        className
      )}
    >
      {/* Top Button */}
      <button
        onClick={() => scrollTo('top')}
        disabled={!canScrollUp}
        className={cn(
          // Large touch target for eye gaze - 56x56px minimum
          'flex h-14 w-14 items-center justify-center rounded-xl shadow-lg transition-all',
          'focus:outline-none focus:ring-4 focus:ring-blue-300',
          'active:scale-95',
          canScrollUp
            ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        )}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <ChevronsUp className="h-7 w-7" />
      </button>

      {/* Up Button */}
      <button
        onClick={() => scrollTo('up')}
        disabled={!canScrollUp}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-xl shadow-lg transition-all',
          'focus:outline-none focus:ring-4 focus:ring-blue-300',
          'active:scale-95',
          canScrollUp
            ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        )}
        aria-label="Scroll up"
        title="Scroll up"
      >
        <ChevronUp className="h-7 w-7" />
      </button>

      {/* Down Button */}
      <button
        onClick={() => scrollTo('down')}
        disabled={!canScrollDown}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-xl shadow-lg transition-all',
          'focus:outline-none focus:ring-4 focus:ring-blue-300',
          'active:scale-95',
          canScrollDown
            ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        )}
        aria-label="Scroll down"
        title="Scroll down"
      >
        <ChevronDown className="h-7 w-7" />
      </button>

      {/* Bottom Button */}
      <button
        onClick={() => scrollTo('bottom')}
        disabled={!canScrollDown}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-xl shadow-lg transition-all',
          'focus:outline-none focus:ring-4 focus:ring-blue-300',
          'active:scale-95',
          canScrollDown
            ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        )}
        aria-label="Scroll to bottom"
        title="Scroll to bottom"
      >
        <ChevronsDown className="h-7 w-7" />
      </button>
    </div>
  );
}
