import axios from './axios.config';

export const authAPI = {
  // Sign up
  signup: async (data) => {
    const response = await axios.post('/auth/signup', data);
    return response.data;
  },

  // Login
  login: async (data) => {
    const response = await axios.post('/auth/login', data);
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await axios.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await axios.post('/auth/logout');
    return response.data;
  },
};