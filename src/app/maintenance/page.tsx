import React from 'react';

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-4">
      <div className="text-center max-w-md space-y-6 bg-white dark:bg-stone-900 p-8 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
        <div className="mx-auto w-16 h-16 bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 rounded-full flex items-center justify-center text-[var(--color-gold)]">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-forest dark:text-stone-50">System Maintenance</h1>
        <p className="text-stone-600 dark:text-stone-400">
          We are currently performing scheduled maintenance to improve our services. We will be back online shortly. Thank you for your patience!
        </p>
        <div className="text-sm text-stone-500 border-t border-stone-200 dark:border-stone-800 pt-4 mt-4">
          Expected completion: Soon
        </div>
      </div>
    </div>
  );
}
