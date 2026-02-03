import { useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../api/task.api';

export const useTasks = (initialFilters = {}) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskAPI.getTasks(filters);
      setTasks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await taskAPI.getTaskStats();
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (taskData) => {
    const response = await taskAPI.createTask(taskData);
    await fetchTasks();
    await fetchStats();
    return response;
  };

  const updateTask = async (id, taskData) => {
    const response = await taskAPI.updateTask(id, taskData);
    await fetchTasks();
    await fetchStats();
    return response;
  };

  const deleteTask = async (id) => {
    const response = await taskAPI.deleteTask(id);
    await fetchTasks();
    await fetchStats();
    return response;
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    tasks,
    stats,
    loading,
    error,
    filters,
    createTask,
    updateTask,
    deleteTask,
    updateFilters,
    clearFilters,
    refreshTasks: fetchTasks,
    fetchStats,
  };
};