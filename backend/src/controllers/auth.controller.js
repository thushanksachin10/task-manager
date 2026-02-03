import 'express-async-errors';
import authService from '../services/auth.service.js';

class AuthController {
  // @route   POST /api/v1/auth/signup
  // @desc    Register a new user
  // @access  Public
  async signup(req, res) {
    const result = await authService.signup(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result
    });
  }

  // @route   POST /api/v1/auth/login
  // @desc    Login user
  // @access  Public
  async login(req, res) {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  }

  // @route   GET /api/v1/auth/me
  // @desc    Get current user
  // @access  Private
  async getMe(req, res) {
    res.status(200).json({
      success: true,
      data: req.user
    });
  }

  // @route   POST /api/v1/auth/logout
  // @desc    Logout user (client-side token removal)
  // @access  Private
  async logout(req, res) {
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  }
}

export default new AuthController();