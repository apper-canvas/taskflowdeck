import React from 'react';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const TaskMeta = ({ category, priority, dueDate, getCategoryColor, getPriorityColor, isOverdue, isDueSoon }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-2">
      <Text as="span" className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
        {category}
      </Text>
      <Text as="span" className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority)} ${
        priority === 'high' && isOverdue ? 'animate-pulse-subtle' : ''
      }`}>
        {priority} priority
      </Text>
      <div className={`flex items-center space-x-1 text-xs ${
        isOverdue ? 'text-error' :
        isDueSoon ? 'text-warning' : 'text-surface-500'
      }`}>
        <ApperIcon name="Calendar" className="w-3 h-3" />
        <Text as="span">{format(new Date(dueDate), 'MMM d, yyyy')}</Text>
        {isOverdue && (
          <Text as="span" className="text-error font-medium">(Overdue)</Text>
        )}
        {isDueSoon && (
          <Text as="span" className="text-warning font-medium">(Due Soon)</Text>
        )}
      </div>
    </div>
  );
};

export default TaskMeta;