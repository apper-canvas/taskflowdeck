import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const EmptyState = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-16"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <ApperIcon name="CheckCircle2" className="w-20 h-20 text-surface-300 mx-auto mb-6" />
      </motion.div>
      <Text as="h3" className="text-xl font-heading font-semibold text-surface-900 mb-2">
        Ready to get productive?
      </Text>
      <Text as="p" className="text-surface-600 mb-6">
        Add your first task above to start organizing your day
      </Text>
      <div className="flex justify-center space-x-4 text-sm text-surface-500">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Zap" className="w-4 h-4" />
          <Text as="span">Press Enter to add quickly</Text>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Target" className="w-4 h-4" />
          <Text as="span">Set priorities & due dates</Text>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;