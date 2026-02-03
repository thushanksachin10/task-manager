import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import ApiError from '../utils/ApiError.js';

class AuthService {
  // Generate JWT token
  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });
  }

  // Register new user
  async signup(userData) {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw ApiError.conflict('Email already registered');
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate token
    const token = this.generateToken(user._id);

    // Return user without password
    const userObject = user.toJSON();

    return {
      user: userObject,
      token
    };
  }

  // Login user
  async login(credentials) {
    const { email, password } = credentials;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // Check if account is active
    if (!user.isActive) {
      throw ApiError.forbidden('Account is deactivated');
    }

    // Compare password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // Generate token
    const token = this.generateToken(user._id);

    // Return user without password
    const userObject = user.toJSON();

    return {
      user: userObject,
      token
    };
  }

  // Verify token
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || !user.isActive) {
        throw ApiError.unauthorized('Invalid token');
      }

      return user;
    } catch (error) {
      throw ApiError.unauthorized('Invalid token');
    }
  }
}

export default new AuthService();