import React from 'react';

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white" style={{ fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-medium border-r border-black/30 dark:border-white/30 pr-6 py-2">
            500
          </h1>
          <div className="text-sm">
            <h2 className="font-normal m-0 tracking-wide">
              INTERNAL_SERVER_ERROR
            </h2>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
          Please contact the developer.
        </p>
      </div>
    </div>
  );
}
