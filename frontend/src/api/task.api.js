import axios from './axios.config';

export const taskAPI = {
  // Get all tasks with filters
  getTasks: async (params = {}) => {
    const response = await axios.get('/tasks', { params });
    return response.data;
  },

  // Get task statistics
  getTaskStats: async () => {
    const response = await axios.get('/tasks/stats');
    return response.data;
  },

  // Get single task
  getTaskById: async (id) => {
    const response = await axios.get(`/tasks/${id}`);
    return response.data;
  },

  // Create task
  createTask: async (data) => {
    const response = await axios.post('/tasks', data);
    return response.data;
  },

  // Update task
  updateTask: async (id, data) => {
    const response = await axios.put(`/tasks/${id}`, data);
    return response.data;
  },

  // Delete task
  deleteTask: async (id) => {
    const response = await axios.delete(`/tasks/${id}`);
    return response.data;
  },
};