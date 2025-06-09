import React from 'react';
import { motion } from 'framer-motion';
import { format, isAfter, isBefore, addDays } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import TaskMeta from '@/components/molecules/TaskMeta';
import EditTaskForm from '@/components/organisms/EditTaskForm';

const TaskCard = ({ task, categories, onToggleComplete, onEdit, onDelete, isEditing, index }) => {
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
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to start of day
    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0); // Normalize due date to start of day
    return isBefore(dueDate, today);
  };

  const isDueSoon = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0);
    const threeDaysFromNow = addDays(today, 3);
    return isAfter(dueDate, today) && isBefore(dueDate, threeDaysFromNow);
  };

  return (
    <motion.div
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
        <Button
          onClick={() => onToggleComplete(task.id)}
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
        </Button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <EditTaskForm
              task={task}
              categories={categories}
              onSave={onEdit}
              onCancel={() => onEdit(null)} // Pass null to indicate cancel editing for this task
            />
          ) : (
            <>
              <Text as="h3" className={`font-medium text-surface-900 break-words ${
                task.completed ? 'line-through text-surface-500' : ''
              }`}>
                {task.title}
              </Text>

              <TaskMeta
                category={task.category}
                priority={task.priority}
                dueDate={task.dueDate}
                getCategoryColor={getCategoryColor}
                getPriorityColor={getPriorityColor}
                isOverdue={isOverdue(task.dueDate)}
                isDueSoon={isDueSoon(task.dueDate)}
              />
            </>
          )}
        </div>

        {/* Actions */}
        {!task.completed && !isEditing && (
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => onEdit(task.id, task)} // Pass task.id to set editing state, pass task for initial data
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 text-surface-400 hover:text-primary transition-colors"
            >
              <ApperIcon name="Edit2" className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onDelete(task.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 text-surface-400 hover:text-error transition-colors"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;