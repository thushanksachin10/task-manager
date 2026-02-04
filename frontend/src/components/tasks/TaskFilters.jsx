const TaskFilters = ({ filters, onFilterChange, onClearFilters }) => {
  return (
    <div className="card">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            placeholder="Search tasks..."
            className="input-field"
          />
        </div>

        <div className="w-40">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="input-field"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="w-40">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={filters.priority || ''}
            onChange={(e) => onFilterChange({ priority: e.target.value })}
            className="input-field"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="w-40">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={filters.sortBy || 'createdAt'}
            onChange={(e) => onFilterChange({ sortBy: e.target.value })}
            className="input-field"
          >
            <option value="createdAt">Date Created</option>
            <option value="title">Title</option>
            <option value="status">Status</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <button
          onClick={onClearFilters}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;