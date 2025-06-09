import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskCard from '@/components/molecules/TaskCard';
import { taskService } from '@/services';

const TaskList = ({ tasks, categories, onTasksChange }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const updatedTask = await taskService.update(taskId, {
        completed: !task.completed
      });

      onTasksChange(prev => prev.map(t =>
        t.id === taskId ? updatedTask : t
      ));

      toast.success(updatedTask.completed ? 'Task completed!' : 'Task reopened');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleEditTask = async (taskId, updates) => {
    if (updates === null) { // This means cancel editing
      setEditingTaskId(null);
      return;
    }
    try {
      const updatedTask = await taskService.update(taskId, updates);
      onTasksChange(prev => prev.map(t =>
        t.id === taskId ? updatedTask : t
      ));
      setEditingTaskId(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskService.delete(taskId);
      onTasksChange(prev => prev.filter(t => t.id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            categories={categories}
            onToggleComplete={handleToggleComplete}
            onEdit={(id, data) => {
                if (data) { // If data is passed, it's setting the task to be edited
                    setEditingTaskId(id);
                } else { // If data is null, it's cancelling editing for this task
                    setEditingTaskId(null);
                }
            }}
            onDelete={handleDeleteTask}
            isEditing={editingTaskId === task.id}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;