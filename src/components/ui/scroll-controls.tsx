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
  const instanceId = React.useRef(`scroll-${Math.random().toString(36).substr(2, 9)}`).current;

  // Check scroll position to enable/disable buttons
  const checkScrollPosition = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      console.log(`[ScrollControls ${instanceId}] No container ref`);
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = container;
    const canUp = scrollTop > 0;
    const canDown = scrollTop < scrollHeight - clientHeight - 10;

    console.log(`[ScrollControls ${instanceId}] Check:`, {
      containerElement: container.tagName,
      containerClass: container.className,
      scrollTop,
      scrollHeight,
      clientHeight,
      canScrollUp: canUp,
      canScrollDown: canDown,
      isScrollable: scrollHeight > clientHeight,
      difference: scrollHeight - clientHeight
    });

    setCanScrollUp(canUp);
    setCanScrollDown(canDown);
  }, [containerRef, instanceId]);

  // Monitor scroll events
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initial check
    checkScrollPosition();

    // Recheck after a delay to catch late-loading content
    const delayedCheck = setTimeout(checkScrollPosition, 100);
    const delayedCheck2 = setTimeout(checkScrollPosition, 500);

    container.addEventListener('scroll', checkScrollPosition);

    // Observe container size changes
    const resizeObserver = new ResizeObserver(checkScrollPosition);
    resizeObserver.observe(container);

    // Also observe content changes (when children are added/removed)
    const mutationObserver = new MutationObserver(checkScrollPosition);
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      attributes: false,
    });

    return () => {
      clearTimeout(delayedCheck);
      clearTimeout(delayedCheck2);
      container.removeEventListener('scroll', checkScrollPosition);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
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
    console.log(`[ScrollControls ${instanceId}] Hidden due to auto-hide - no scrollable content`);
    return null;
  }

  console.log(`[ScrollControls ${instanceId}] Rendering controls`, { canScrollUp, canScrollDown, autoHide, position });

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col gap-2 md:gap-3',
        // Position on screen - adjusted to sit above bottom nav
        // Bottom nav is ~70px tall, so position controls accounting for that
        'bottom-24 md:bottom-28',
        position === 'right' ? 'right-2 md:right-4 lg:right-6' : 'left-2 md:left-4 lg:left-6',
        className
      )}
      style={{
        // Debug: temporary red border to verify visibility
        border: '2px solid red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)'
      }}
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
