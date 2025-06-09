import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import ApperIcon from '../components/ApperIcon';
import { taskService, categoryService } from '../services';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [tasksData, categoriesData] = await Promise.all([
          taskService.getAll(),
          categoryService.getAll()
        ]);
        setTasks(tasksData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message || 'Failed to load data');
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredTasks = tasks
    .filter(task => {
      if (activeCategory !== 'all' && task.category !== activeCategory) return false;
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'date':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (loading) {
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
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
        <h3 className="text-lg font-medium text-surface-900 mb-2">Something went wrong</h3>
        <p className="text-surface-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b border-surface-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-surface-900">TaskFlow</h1>
            <p className="text-surface-600 text-sm">
              {completedTasks} of {totalTasks} tasks completed ({completionRate}%)
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-surface-300 rounded-lg focus-ring w-64"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-surface-300 rounded-lg focus-ring"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="alphabetical">Sort Alphabetically</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === 'all' 
                ? 'bg-primary text-white' 
                : 'text-surface-600 hover:bg-surface-100'
            }`}
          >
            All Tasks ({tasks.length})
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category.name 
                  ? 'bg-primary text-white' 
                  : 'text-surface-600 hover:bg-surface-100'
              }`}
            >
              {category.name} ({tasks.filter(task => task.category === category.name).length})
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <MainFeature 
          tasks={filteredTasks}
          categories={categories}
          onTasksChange={setTasks}
          onCategoriesChange={setCategories}
        />
      </div>
    </div>
  );
};

export default Home;