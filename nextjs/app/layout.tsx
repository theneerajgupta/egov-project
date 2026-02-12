import { ReactNode } from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { ExternalNavbar } from '@/components/ui/navbar/External.navbar';
import { ExternalAccessibilityBar } from '@/components/ui/AccessibilityBar/External.accessibilityBar';
import ExternalFooter from '@/components/ui/footer/External.footer';

export const metadata: Metadata = {
  title: 'DG4Modules',
  description: 'Internal application management system.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='flex flex-col bg-white text-gray-900'>
        {/* Header + Content wrapper */}
        <div className='flex flex-col min-h-screen'>
          <ExternalAccessibilityBar />
          <ExternalNavbar />

          <main className='flex flex-col flex-1'>{children}</main>
        </div>

        <ExternalFooter />
      </body>
    </html>
  );
}
