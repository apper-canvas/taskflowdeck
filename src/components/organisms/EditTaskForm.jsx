import React, { useState } from 'react';
import { format } from 'date-fns';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';

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
      <Input
        type="text"
        value={editData.title}
        onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
        className="w-full px-3 py-2 border border-surface-300 rounded-lg focus-ring"
        autoFocus
      />
      <div className="flex flex-wrap gap-2">
        <Select
          value={editData.category}
          onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
          className="px-2 py-1 text-sm border border-surface-300 rounded focus-ring"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </Select>
        <Select
          value={editData.priority}
          onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value }))}
          className="px-2 py-1 text-sm border border-surface-300 rounded focus-ring"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
        <Input
          type="date"
          value={editData.dueDate}
          onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
          className="px-2 py-1 text-sm border border-surface-300 rounded focus-ring"
        />
      </div>
      <div className="flex space-x-2">
        <Button
          type="submit"
          className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-secondary transition-colors"
        >
          Save
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-sm border border-surface-300 rounded hover:bg-surface-50 transition-colors"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditTaskForm;