import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError(t('signUp.emptyFieldsError'));
      return;
    }

    if (password !== confirmPassword) {
      setError(t('signUp.passwordMismatchError'));
      return;
    }

    const existingDataJSON = localStorage.getItem('user_database');
    const database = existingDataJSON ? JSON.parse(existingDataJSON) : [];

    const userExists = database.find((user: any) => user.username === username);

    if (userExists) {
      setError(t('signUp.userExistsError'));
      return;
    }
    
    const newUser = {
      username,
      password,
      timestamp: new Date().toISOString(),
      role: 'user', // Add user role
    };
    
    const updatedDatabase = [...database, newUser];
    localStorage.setItem('user_database', JSON.stringify(updatedDatabase));

    setSuccess(t('signUp.successMessage'));
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">{t('signUp.title')}</h1>
          <p className="text-gray-400">{t('signUp.subtitle')}</p>
        </div>
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="username" className="text-sm font-bold text-gray-300 block mb-2">
              {t('general.username')}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('signIn.emailPlaceholder')}
              aria-label={t('general.username')}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-gray-300 block mb-2">
              {t('general.password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('signIn.passwordPlaceholder')}
              aria-label={t('general.password')}
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="text-sm font-bold text-gray-300 block mb-2">
              {t('signUp.confirmPassword')}
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('signIn.passwordPlaceholder')}
              aria-label={t('signUp.confirmPassword')}
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-500 text-sm text-center">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold transition-colors duration-200 disabled:bg-gray-500"
            disabled={!!success}
          >
            {t('signUp.signUpButton')}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 pt-4">
          {t('signUp.hasAccount')}{' '}
          <Link to="/" className="font-bold text-blue-500 hover:text-blue-600 transition-colors">
            {t('signUp.logInLink')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
