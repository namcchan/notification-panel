'use client';

import Link from 'next/link';
import { NotificationSheet } from './notification';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen relative">
      <nav className="w-full border-b sticky top-0 z-10 backdrop-blur bg-background/90">
        <div className="h-16 flex items-center justify-between max-w-6xl mx-auto px-4 lg:px-8">
          <Link href="/" className="text-lg font-bold">
            Notification Panel
          </Link>

          <NotificationSheet />
        </div>
      </nav>
      {children}
    </div>
  );
};
