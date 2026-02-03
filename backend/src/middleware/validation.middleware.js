import ApiError from '../utils/ApiError.js';

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      
      throw ApiError.badRequest(errorMessage);
    }

    // Replace req.body with validated and sanitized value
    req.body = value;
    next();
  };
};

export default validate;