import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="p-6 text-center">
      <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
      <Text as="h3" className="text-lg font-medium text-surface-900 mb-2">Something went wrong</Text>
      <Text as="p" className="text-surface-600 mb-4">{error}</Text>
      <Button
        onClick={onRetry}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorState;