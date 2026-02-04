import { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useToast } from '../../hooks/useToast';
import TaskList from '../../components/tasks/TaskList';
import TaskForm from '../../components/tasks/TaskForm';
import TaskFilters from '../../components/tasks/TaskFilters';
import Button from '../../components/common/Button';
import Toast from '../../components/common/Toast';

const TasksPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const { tasks, loading, filters, createTask, updateTask, deleteTask, updateFilters, clearFilters } = useTasks();
  const { toasts, success, error, removeToast } = useToast();

  const handleCreateTask = async (data) => {
    setFormLoading(true);
    try {
      await createTask(data);
      success('Task created successfully!');
      setShowForm(false);
    } catch (err) {
      error(err.response?.data?.message || 'Failed to create task');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateTask = async (id, data) => {
    try {
      await updateTask(id, data);
      success('Task updated successfully!');
    } catch (err) {
      error(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      success('Task deleted successfully!');
    } catch (err) {
      error(err.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div>
      <Toast toasts={toasts} onClose={removeToast} />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">Manage and organize your tasks</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Task'}
        </Button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Task</h2>
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
            loading={formLoading}
          />
        </div>
      )}

      <div className="mb-6">
        <TaskFilters
          filters={filters}
          onFilterChange={updateFilters}
          onClearFilters={clearFilters}
        />
      </div>

      <TaskList
        tasks={tasks}
        loading={loading}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default TasksPage;