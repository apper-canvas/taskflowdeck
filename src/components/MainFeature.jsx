import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import { taskService } from '../services';

const MainFeature = ({ tasks, categories, onTasksChange, onCategoriesChange }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'Work',
    priority: 'medium',
    dueDate: format(new Date(), 'yyyy-MM-dd')
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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
    try {
      const updatedTask = await taskService.update(taskId, updates);
      onTasksChange(prev => prev.map(t => 
        t.id === taskId ? updatedTask : t
      ));
      setEditingTask(null);
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error text-white';
      case 'medium': return 'bg-warning text-white';
      case 'low': return 'bg-success text-white';
      default: return 'bg-surface-300 text-surface-700';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Work': return 'bg-primary text-white';
      case 'Personal': return 'bg-accent text-white';
      case 'Urgent': return 'bg-error text-white';
      default: return 'bg-surface-500 text-white';
    }
  };

  const isOverdue = (date) => {
    return isBefore(new Date(date), new Date()) && !isBefore(new Date(date), new Date().setHours(0, 0, 0, 0));
  };

  const isDueSoon = (date) => {
    return isAfter(new Date(date), new Date()) && isBefore(new Date(date), addDays(new Date(), 3));
  };

  if (tasks.length === 0) {
    return (
      <div className="space-y-6">
        {/* Add Task Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-surface-200 p-6"
        >
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTask.title}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 text-lg border border-surface-300 rounded-lg focus-ring"
                autoFocus
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                value={newTask.category}
                onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                className="px-3 py-2 border border-surface-300 rounded-lg focus-ring"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                className="px-3 py-2 border border-surface-300 rounded-lg focus-ring"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                className="px-3 py-2 border border-surface-300 rounded-lg focus-ring"
              />
              <motion.button
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
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Empty State */}
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
          <h3 className="text-xl font-heading font-semibold text-surface-900 mb-2">
            Ready to get productive?
          </h3>
          <p className="text-surface-600 mb-6">
            Add your first task above to start organizing your day
          </p>
          <div className="flex justify-center space-x-4 text-sm text-surface-500">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Zap" className="w-4 h-4" />
              <span>Press Enter to add quickly</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Target" className="w-4 h-4" />
              <span>Set priorities & due dates</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Task Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-surface-200 p-6"
      >
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTask.title}
              onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 text-lg border border-surface-300 rounded-lg focus-ring"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <select
              value={newTask.category}
              onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
              className="px-3 py-2 border border-surface-300 rounded-lg focus-ring"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
              className="px-3 py-2 border border-surface-300 rounded-lg focus-ring"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
              className="px-3 py-2 border border-surface-300 rounded-lg focus-ring"
            />
            <motion.button
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
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: task.completed ? 0.7 : 1, 
                y: 0,
                scale: 1
              }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-xl border border-surface-200 p-4 hover:shadow-md transition-all ${
                task.completed ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <motion.button
                  onClick={() => handleToggleComplete(task.id)}
                  className="flex-shrink-0 mt-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    task.completed 
                      ? 'bg-success border-success text-white' 
                      : 'border-surface-300 hover:border-primary'
                  }`}>
                    {task.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="animate-checkbox"
                      >
                        <ApperIcon name="Check" className="w-3 h-3" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  {editingTask === task.id ? (
                    <EditTaskForm 
                      task={task}
                      categories={categories}
                      onSave={(updates) => handleEditTask(task.id, updates)}
                      onCancel={() => setEditingTask(null)}
                    />
                  ) : (
                    <>
                      <h3 className={`font-medium text-surface-900 break-words ${
                        task.completed ? 'line-through text-surface-500' : ''
                      }`}>
                        {task.title}
                      </h3>
                      
                      {/* Task Meta */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                          {task.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)} ${
                          task.priority === 'high' && isOverdue(task.dueDate) ? 'animate-pulse-subtle' : ''
                        }`}>
                          {task.priority} priority
                        </span>
                        <div className={`flex items-center space-x-1 text-xs ${
                          isOverdue(task.dueDate) ? 'text-error' :
                          isDueSoon(task.dueDate) ? 'text-warning' : 'text-surface-500'
                        }`}>
                          <ApperIcon name="Calendar" className="w-3 h-3" />
                          <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                          {isOverdue(task.dueDate) && (
                            <span className="text-error font-medium">(Overdue)</span>
                          )}
                          {isDueSoon(task.dueDate) && (
                            <span className="text-warning font-medium">(Due Soon)</span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Actions */}
                {!task.completed && editingTask !== task.id && (
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={() => setEditingTask(task.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 text-surface-400 hover:text-primary transition-colors"
                    >
                      <ApperIcon name="Edit2" className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteTask(task.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1 text-surface-400 hover:text-error transition-colors"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const EditTaskForm = ({ task, categories, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    title: task.title,
    category: task.category,
    priority: task.priority,
    dueDate: format(new Date(task.dueDate), 'yyyy-MM-dd')
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...editData,
      dueDate: new Date(editData.dueDate)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={editData.title}
        onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus-ring"
        autoFocus
      />
      <div className="flex flex-wrap gap-2">
        <select
          value={editData.category}
          onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
          className="px-2 py-1 text-sm border border-surface-300 rounded focus-ring"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <select
          value={editData.priority}
          onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value }))}
          className="px-2 py-1 text-sm border border-surface-300 rounded focus-ring"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={editData.dueDate}
          onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
          className="px-2 py-1 text-sm border border-surface-300 rounded focus-ring"
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-secondary transition-colors"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-sm border border-surface-300 rounded hover:bg-surface-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MainFeature;