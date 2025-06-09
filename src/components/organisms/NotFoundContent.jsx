import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';

const NotFoundContent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ApperIcon name="FileQuestion" className="w-24 h-24 text-surface-300 mx-auto mb-6" />
        </motion.div>
        <Text as="h1" className="text-4xl font-heading font-bold text-surface-900 mb-4">Page Not Found</Text>
        <Text as="p" className="text-surface-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          <span>Back to Tasks</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundContent;