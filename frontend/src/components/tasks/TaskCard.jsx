import { useState } from 'react';
import Button from '../common/Button';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800',
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await onDelete(task._id);
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  const handleStatusChange = async () => {
    const statusOrder = ['pending', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    
    await onUpdate(task._id, { status: nextStatus });
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
            {task.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>
      </div>
      
      {task.description && (
        <p className="text-gray-600 text-sm mb-4">{task.description}</p>
      )}
      
      {task.dueDate && (
        <p className="text-xs text-gray-500 mb-4">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
      
      <div className="flex gap-2 pt-3 border-t border-gray-100">
        <Button 
          variant="secondary" 
          onClick={handleStatusChange}
          className="text-xs"
        >
          Change Status
        </Button>
        <Button 
          variant="danger" 
          onClick={handleDelete}
          loading={isDeleting}
          className="text-xs"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;