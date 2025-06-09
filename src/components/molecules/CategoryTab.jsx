import React from 'react';
import Button from '@/components/atoms/Button';

const CategoryTab = ({ name, count, isActive, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        isActive
          ? 'bg-primary text-white'
          : 'text-surface-600 hover:bg-surface-100'
      }`}
    >
      {name} {count !== undefined ? `(${count})` : ''}
    </Button>
  );
};

export default CategoryTab;