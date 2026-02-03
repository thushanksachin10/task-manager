import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title cannot exceed 100 characters',
      'any.required': 'Title is required'
    }),
  description: Joi.string()
    .max(500)
    .allow('')
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
  status: Joi.string()
    .valid('pending', 'in-progress', 'completed')
    .messages({
      'any.only': 'Status must be one of: pending, in-progress, completed'
    }),
  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .messages({
      'any.only': 'Priority must be one of: low, medium, high'
    }),
  dueDate: Joi.date()
    .allow(null)
    .messages({
      'date.base': 'Due date must be a valid date'
    })
});

export const updateTaskSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .messages({
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title cannot exceed 100 characters'
    }),
  description: Joi.string()
    .max(500)
    .allow('')
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
  status: Joi.string()
    .valid('pending', 'in-progress', 'completed')
    .messages({
      'any.only': 'Status must be one of: pending, in-progress, completed'
    }),
  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .messages({
      'any.only': 'Priority must be one of: low, medium, high'
    }),
  dueDate: Joi.date()
    .allow(null)
    .messages({
      'date.base': 'Due date must be a valid date'
    })
}).min(1);