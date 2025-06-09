import React from 'react';

const LoadingState = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="animate-pulse">
        <div className="h-8 bg-surface-200 rounded w-48 mb-4"></div>
        <div className="h-12 bg-surface-200 rounded mb-6"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-surface-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;