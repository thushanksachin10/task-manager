import 'express-async-errors';
import userService from '../services/user.service.js';

class UserController {
  // @route   GET /api/v1/users/profile
  // @desc    Get user profile
  // @access  Private
  async getProfile(req, res) {
    const user = await userService.getProfile(req.user._id);

    res.status(200).json({
      success: true,
      data: user
    });
  }

  // @route   PUT /api/v1/users/profile
  // @desc    Update user profile
  // @access  Private
  async updateProfile(req, res) {
    const user = await userService.updateProfile(req.user._id, req.body);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  }

  // @route   PUT /api/v1/users/change-password
  // @desc    Change user password
  // @access  Private
  async changePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    const result = await userService.changePassword(
      req.user._id,
      currentPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      message: result.message
    });
  }

  // @route   DELETE /api/v1/users/account
  // @desc    Delete user account
  // @access  Private
  async deleteAccount(req, res) {
    const result = await userService.deleteAccount(req.user._id);

    res.status(200).json({
      success: true,
      message: result.message
    });
  }
}

export default new UserController();