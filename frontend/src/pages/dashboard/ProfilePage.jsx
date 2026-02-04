import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { userAPI } from '../../api/user.api';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Toast from '../../components/common/Toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { toasts, success, error, removeToast } = useToast();
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onUpdateProfile = async (data) => {
    setProfileLoading(true);
    try {
      const response = await userAPI.updateProfile(data);
      updateUser(response.data);
      success('Profile updated successfully!');
    } catch (err) {
      error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const onChangePassword = async (data) => {
    setPasswordLoading(true);
    try {
      await userAPI.changePassword(data);
      success('Password changed successfully!');
      resetPassword();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div>
      <Toast toasts={toasts} onClose={removeToast} />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
      <p className="text-gray-600 mb-8">Manage your account settings</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
          <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-4">
            <Input
              label="Full Name"
              {...registerProfile('name')}
              error={profileErrors.name?.message}
            />
            <Input
              label="Email"
              type="email"
              {...registerProfile('email')}
              error={profileErrors.email?.message}
            />
            <Button type="submit" loading={profileLoading}>
              Update Profile
            </Button>
          </form>
        </div>

        {/* Change Password */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
          <form onSubmit={handleSubmitPassword(onChangePassword)} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              {...registerPassword('currentPassword')}
              error={passwordErrors.currentPassword?.message}
            />
            <Input
              label="New Password"
              type="password"
              {...registerPassword('newPassword')}
              error={passwordErrors.newPassword?.message}
            />
            <Button type="submit" loading={passwordLoading}>
              Change Password
            </Button>
          </form>
        </div>
      </div>

      {/* Account Information */}
      <div className="card mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Account Details</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">User ID:</span>
            <span className="font-mono text-gray-900">{user?._id}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Role:</span>
            <span className="font-medium text-gray-900 capitalize">{user?.role}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Member since:</span>
            <span className="font-medium text-gray-900">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;