import React from 'react';
import Text from '@/components/atoms/Text';

const ProgressDisplay = ({ completedTasks, totalTasks, completionRate }) => {
  return (
    <Text as="p" className="text-surface-600 text-sm">
      {completedTasks} of {totalTasks} tasks completed ({completionRate}%)
    </Text>
  );
};

export default ProgressDisplay;