'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, ClipboardList, BarChart3, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/lib/auth';
import { ScrollControls } from '@/components/ui';

const navItems = [
  { href: '/', label: 'Roadmap', icon: Map },
  { href: '/assess', label: 'Assess', icon: ClipboardList },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  const mainContentRef = React.useRef<HTMLElement>(null);

  // Don't show shell on login page
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Pages that need full width (no max-width constraint)
  const isFullWidthPage = pathname === '/';

  return (
    <div className="flex min-h-screen flex-col relative">
      {/* Scroll Controls - only for non-full-width pages */}
      {!isFullWidthPage && <ScrollControls containerRef={mainContentRef} position="right" />}

      {/* Header - responsive padding and text size */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-3 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">MND Playbook</h1>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Log out"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">Sign in</span>
            </Link>
          )}
        </div>
      </header>

      {/* Main content - responsive padding, account for larger bottom nav */}
      <main ref={mainContentRef} className="flex-1 overflow-auto pb-28 md:pb-24 lg:pb-24">
        {isFullWidthPage ? (
          children
        ) : (
          <div className="mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
            {children}
          </div>
        )}
      </main>

      {/* Bottom navigation - large touch targets for eye gaze users */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white safe-area-bottom">
        <div className="mx-auto flex max-w-4xl justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  // Large touch targets - min 70px height for eye gaze accessibility
                  'flex flex-1 flex-col items-center justify-center py-4 min-h-[70px]',
                  // Larger text for readability
                  'text-sm font-medium md:text-base',
                  // Clear focus states for accessibility
                  'focus:outline-none focus:ring-4 focus:ring-inset focus:ring-blue-300',
                  'transition-colors',
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Larger icons - 28px for better visibility */}
                <item.icon className="h-7 w-7 md:h-8 md:w-8" />
                <span className="mt-1.5">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
