import 'express-async-errors';
import taskService from '../services/task.service.js';

class TaskController {
  // @route   GET /api/v1/tasks
  // @desc    Get all tasks for logged-in user
  // @access  Private
  async getTasks(req, res) {
    const filters = {
      status: req.query.status,
      priority: req.query.priority,
      search: req.query.search,
      sortBy: req.query.sortBy,
      order: req.query.order
    };

    const tasks = await taskService.getTasks(req.user._id, filters);

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  }

  // @route   GET /api/v1/tasks/stats
  // @desc    Get task statistics
  // @access  Private
  async getTaskStats(req, res) {
    const stats = await taskService.getTaskStats(req.user._id);

    res.status(200).json({
      success: true,
      data: stats
    });
  }

  // @route   GET /api/v1/tasks/:id
  // @desc    Get single task
  // @access  Private
  async getTaskById(req, res) {
    const task = await taskService.getTaskById(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      data: task
    });
  }

  // @route   POST /api/v1/tasks
  // @desc    Create new task
  // @access  Private
  async createTask(req, res) {
    const task = await taskService.createTask(req.user._id, req.body);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  }

  // @route   PUT /api/v1/tasks/:id
  // @desc    Update task
  // @access  Private
  async updateTask(req, res) {
    const task = await taskService.updateTask(
      req.params.id,
      req.user._id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  }

  // @route   DELETE /api/v1/tasks/:id
  // @desc    Delete task
  // @access  Private
  async deleteTask(req, res) {
    const result = await taskService.deleteTask(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: result.message
    });
  }
}

export default new TaskController();