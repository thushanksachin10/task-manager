import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../common/Input';
import Button from '../common/Button';

const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['pending', 'in-progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().optional(),
});

const TaskForm = ({ onSubmit, onCancel, initialData = null, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Task Title"
        {...register('title')}
        error={errors.title?.message}
        placeholder="Enter task title"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register('description')}
          rows="3"
          className="input-field"
          placeholder="Enter task description (optional)"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select {...register('status')} className="input-field">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select {...register('priority')} className="input-field">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <Input
        label="Due Date (optional)"
        type="date"
        {...register('dueDate')}
        error={errors.dueDate?.message}
      />

      <div className="flex gap-3 pt-4">
        <Button type="submit" loading={loading} className="flex-1">
          {initialData ? 'Update Task' : 'Create Task'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;