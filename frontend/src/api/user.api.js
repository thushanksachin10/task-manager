import axios from './axios.config';

export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await axios.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data) => {
    const response = await axios.put('/users/profile', data);
    return response.data;
  },

  // Change password
  changePassword: async (data) => {
    const response = await axios.put('/users/change-password', data);
    return response.data;
  },

  // Delete account
  deleteAccount: async () => {
    const response = await axios.delete('/users/account');
    return response.data;
  },
};