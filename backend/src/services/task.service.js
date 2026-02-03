import Task from '../models/Task.model.js';
import ApiError from '../utils/ApiError.js';

class TaskService {
  // Get all tasks for a user with filters
  async getTasks(userId, filters = {}) {
    const { status, priority, search, sortBy = 'createdAt', order = 'desc' } = filters;

    const query = { user: userId };

    // Apply filters
    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sortOrder = order === 'desc' ? -1 : 1;
    const sort = { [sortBy]: sortOrder };

    const tasks = await Task.find(query)
      .sort(sort)
      .populate('user', 'name email');

    return tasks;
  }

  // Get single task
  async getTaskById(taskId, userId) {
    const task = await Task.findOne({ _id: taskId, user: userId })
      .populate('user', 'name email');

    if (!task) {
      throw ApiError.notFound('Task not found');
    }

    return task;
  }

  // Create new task
  async createTask(userId, taskData) {
    const task = await Task.create({
      ...taskData,
      user: userId
    });

    return task;
  }

  // Update task
  async updateTask(taskId, userId, updateData) {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      throw ApiError.notFound('Task not found');
    }

    return task;
  }

  // Delete task
  async deleteTask(taskId, userId) {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!task) {
      throw ApiError.notFound('Task not found');
    }

    return { message: 'Task deleted successfully' };
  }

  // Get task statistics
  async getTaskStats(userId) {
    const stats = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await Task.countDocuments({ user: userId });

    const formattedStats = {
      total,
      pending: 0,
      'in-progress': 0,
      completed: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });

    return formattedStats;
  }
}

export default new TaskService();