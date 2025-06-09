import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import { taskService } from '@/services';

const AddTaskForm = ({ categories, onTasksChange }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'Work',
    priority: 'medium',
    dueDate: format(new Date(), 'yyyy-MM-dd')
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    setIsAdding(true);
    try {
      const task = await taskService.create({
        ...newTask,
        dueDate: new Date(newTask.dueDate)
      });

      onTasksChange(prev => [task, ...prev]);
      setNewTask({
        title: '',
        category: 'Work',
        priority: 'medium',
        dueDate: format(new Date(), 'yyyy-MM-dd')
      });
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-surface-200 p-6"
    >
      <form onSubmit={handleAddTask} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="What needs to be done?"
            value={newTask.title}
            onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 text-lg border border-surface-300 rounded-lg focus-ring"
            autoFocus
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <Select
            value={newTask.category}
            onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
            className="px-3 py-2 border border-surface-300 rounded-lg focus-ring"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </Select>
          <Select
            value={newTask.priority}
            onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
            className="px-3 py-2 border border-surface-300 rounded-lg focus-ring"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </Select>
          <Input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
            className="px-3 py-2 border border-surface-300 rounded-lg focus-ring"
          />
          <Button
            type="submit"
            disabled={isAdding || !newTask.title.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isAdding ? (
              <>
                <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>Add Task</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddTaskForm;