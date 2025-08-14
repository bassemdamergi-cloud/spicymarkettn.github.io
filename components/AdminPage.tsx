
import React, { useEffect, useState } from 'react';
import { useTranslation } from '../lib/i18n';

interface User {
  username: string;
  timestamp: string;
  role?: 'admin' | 'user';
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { t } = useTranslation();

  const loadUsers = () => {
    const regularUsersJSON = localStorage.getItem('user_database');
    const adminUsersJSON = localStorage.getItem('admin_database');
    const regularUsers = regularUsersJSON ? JSON.parse(regularUsersJSON) : [];
    const adminUsers = adminUsersJSON ? JSON.parse(adminUsersJSON) : [];
    const allUsers = [...regularUsers, ...adminUsers].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setUsers(allUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newUsername.trim() || !newPassword.trim()) {
      setError(t('adminUsers.provideCredentialsError'));
      return;
    }

    const regularUsersJSON = localStorage.getItem('user_database');
    const adminUsersJSON = localStorage.getItem('admin_database');
    const regularUsers = regularUsersJSON ? JSON.parse(regularUsersJSON) : [];
    const adminUsers = adminUsersJSON ? JSON.parse(adminUsersJSON) : [];
    const allUsers = [...regularUsers, ...adminUsers];

    const userExists = allUsers.find((user: any) => user.username === newUsername);

    if (userExists) {
      setError(t('signUp.userExistsError'));
      return;
    }

    const newUser = {
      username: newUsername,
      password: newPassword,
      timestamp: new Date().toISOString(),
      role: 'admin',
    };

    const updatedAdminDatabase = [...adminUsers, newUser];
    localStorage.setItem('admin_database', JSON.stringify(updatedAdminDatabase));
    
    loadUsers(); // Refresh the user list from both sources
    setSuccess(t('adminUsers.userAddedSuccess'));
    setNewUsername('');
    setNewPassword('');

    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  return (
    <div className="w-full max-w-4xl p-4 sm:p-6 space-y-8 animate-fade-in">
      <div className="text-left">
        <h1 className="text-3xl font-bold text-white">{t('adminUsers.title')}</h1>
        <p className="text-gray-400 mt-1">{t('adminUsers.subtitle')}</p>
      </div>
      
      {/* User List */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">{t('adminUsers.registeredUsers')}</h2>
        <div className="bg-gray-800 rounded-lg shadow-md p-4 max-h-72 overflow-y-auto custom-scrollbar">
          {users.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {users.map((user, index) => (
                <li key={index} className="py-3 flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <span className="text-gray-200 break-all font-medium">{user.username}</span>
                    {user.role === 'admin' && <span className="ms-2 text-xs bg-yellow-500 text-gray-900 font-bold py-0.5 px-2 rounded-full">{t('adminUsers.adminBadge')}</span>}
                  </div>
                  <span className="text-xs text-gray-400 ms-4 flex-shrink-0">
                    {new Date(user.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400 py-4">{t('adminUsers.noUsersFound')}</p>
          )}
        </div>
      </div>

      {/* Add User Form */}
      <div className="border-t border-gray-700 pt-6">
        <h2 className="text-xl font-bold text-white mb-4">{t('adminUsers.addNewUser')}</h2>
        <form onSubmit={handleAddUser} className="space-y-4 p-4 bg-gray-800 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              id="new-username"
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('adminUsers.usernamePlaceholder')}
              aria-label={t('adminUsers.usernamePlaceholder')}
            />
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('adminUsers.passwordPlaceholder')}
              aria-label={t('adminUsers.passwordPlaceholder')}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center col-span-full">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center col-span-full">{success}</p>}

          <button
            type="submit"
            className="w-full md:w-auto py-2 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold transition-colors duration-200"
          >
            {t('adminUsers.addUserButton')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
