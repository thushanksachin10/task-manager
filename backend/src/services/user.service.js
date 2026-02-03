import User from '../models/User.model.js';
import ApiError from '../utils/ApiError.js';

class UserService {
  // Get user profile
  async getProfile(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return user;
  }

  // Update user profile
  async updateProfile(userId, updateData) {
    const { name, email, avatar } = updateData;

    // Check if email is being changed and is already in use
    if (email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: userId } 
      });
      
      if (existingUser) {
        throw ApiError.conflict('Email already in use');
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { 
        ...(name && { name }),
        ...(email && { email }),
        ...(avatar !== undefined && { avatar })
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return user;
  }

  // Change password
  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    // Verify current password
    const isPasswordMatch = await user.comparePassword(currentPassword);

    if (!isPasswordMatch) {
      throw ApiError.unauthorized('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return { message: 'Password updated successfully' };
  }

  // Delete account (soft delete)
  async deleteAccount(userId) {
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return { message: 'Account deactivated successfully' };
  }
}

export default new UserService();