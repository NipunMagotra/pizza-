'use client';

import { ToastProvider } from '@/components/ui/Toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-bg">
        {children}
      </div>
    </ToastProvider>
  );
}
