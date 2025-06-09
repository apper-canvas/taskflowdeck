import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { taskService, categoryService } from '@/services';
import LoadingState from '@/components/organisms/LoadingState';
import ErrorState from '@/components/organisms/ErrorState';
import PageHeader from '@/components/organisms/PageHeader';
import AddTaskForm from '@/components/organisms/AddTaskForm';
import TaskList from '@/components/organisms/TaskList';
import EmptyState from '@/components/organisms/EmptyState';

const HomePage = () => {
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

  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    taskCount: tasks.filter(task => task.category === cat.name).length
  }));

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <PageHeader
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        completionRate={completionRate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categoriesWithCounts}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        allTasksCount={tasks.length}
      />

      <div className="flex-1 overflow-y-auto p-6">
        <AddTaskForm categories={categories} onTasksChange={setTasks} />
        {filteredTasks.length === 0 && searchQuery === '' && activeCategory === 'all' ? (
          <EmptyState />
        ) : (
          <TaskList
            tasks={filteredTasks}
            categories={categories}
            onTasksChange={setTasks}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;