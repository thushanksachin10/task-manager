import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const DashboardPage = () => {
  const { user } = useAuth();
  const { stats, loading, fetchStats } = useTasks();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">Here's an overview of your tasks</p>
      </div>

      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
              <h3 className="text-sm font-medium text-blue-900 mb-1">Total Tasks</h3>
              <p className="text-3xl font-bold text-blue-700">{stats?.total || 0}</p>
            </div>

            <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100">
              <h3 className="text-sm font-medium text-yellow-900 mb-1">Pending</h3>
              <p className="text-3xl font-bold text-yellow-700">{stats?.pending || 0}</p>
            </div>

            <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
              <h3 className="text-sm font-medium text-purple-900 mb-1">In Progress</h3>
              <p className="text-3xl font-bold text-purple-700">{stats?.['in-progress'] || 0}</p>
            </div>

            <div className="card bg-gradient-to-br from-green-50 to-green-100">
              <h3 className="text-sm font-medium text-green-900 mb-1">Completed</h3>
              <p className="text-3xl font-bold text-green-700">{stats?.completed || 0}</p>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/tasks">
                <Button>View All Tasks</Button>
              </Link>
              <Link to="/tasks">
                <Button variant="secondary">Create New Task</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;