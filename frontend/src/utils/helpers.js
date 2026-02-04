/**
 * Format date to readable string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return 'N/A';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };

  return new Date(date).toLocaleDateString('en-US', defaultOptions);
};

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  if (!date) return 'N/A';

  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter of string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert string to title case
 */
export const toTitleCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format task status for display
 */
export const formatStatus = (status) => {
  const statusMap = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'completed': 'Completed',
  };
  return statusMap[status] || status;
};

/**
 * Get status color class
 */
export const getStatusColor = (status) => {
  const colors = {
    'pending': 'yellow',
    'in-progress': 'blue',
    'completed': 'green',
  };
  return colors[status] || 'gray';
};

/**
 * Get priority color class
 */
export const getPriorityColor = (priority) => {
  const colors = {
    'low': 'gray',
    'medium': 'orange',
    'high': 'red',
  };
  return colors[priority] || 'gray';
};

/**
 * Sort array of objects by key
 */
export const sortByKey = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Filter array by search term
 */
export const filterBySearch = (array, searchTerm, keys = []) => {
  if (!searchTerm) return array;

  const lowerSearch = searchTerm.toLowerCase();

  return array.filter(item => {
    return keys.some(key => {
      const value = item[key];
      return value && value.toString().toLowerCase().includes(lowerSearch);
    });
  });
};

/**
 * Debounce function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Get error message from API error
 */
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

/**
 * Generate initials from name
 */
export const getInitials = (name) => {
  if (!name) return '?';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Check if date is overdue
 */
export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

/**
 * Get days until due date
 */
export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null;
  
  const now = new Date();
  const due = new Date(dueDate);
  const diffTime = due - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * Format due date with urgency
 */
export const formatDueDate = (dueDate) => {
  if (!dueDate) return 'No due date';
  
  const days = getDaysUntilDue(dueDate);
  
  if (days < 0) {
    return `Overdue by ${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''}`;
  }
  if (days === 0) {
    return 'Due today';
  }
  if (days === 1) {
    return 'Due tomorrow';
  }
  if (days <= 7) {
    return `Due in ${days} days`;
  }
  
  return formatDate(dueDate);
};

/**
 * Local storage helpers
 */
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};

/**
 * Generate random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Sleep/delay function
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};