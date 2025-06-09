import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Text from '@/components/atoms/Text';
import CategoryTab from '@/components/molecules/CategoryTab';
import ProgressDisplay from '@/components/molecules/ProgressDisplay';

const PageHeader = ({
  completedTasks,
  totalTasks,
  completionRate,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  categories,
  activeCategory,
  setActiveCategory,
  allTasksCount
}) => {
  return (
    <header className="flex-shrink-0 bg-white border-b border-surface-200 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Text as="h1" className="text-2xl font-heading font-bold text-surface-900">TaskFlow</Text>
          <ProgressDisplay
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            completionRate={completionRate}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-surface-300 rounded-lg focus-ring w-64"
            />
          </div>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-surface-300 rounded-lg focus-ring"
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="alphabetical">Sort Alphabetically</option>
          </Select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1">
        <CategoryTab
          name="All Tasks"
          count={allTasksCount}
          isActive={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
        />
        {categories.map(category => (
          <CategoryTab
            key={category.id}
            name={category.name}
            count={category.taskCount}
            isActive={activeCategory === category.name}
            onClick={() => setActiveCategory(category.name)}
          />
        ))}
      </div>
    </header>
  );
};

export default PageHeader;