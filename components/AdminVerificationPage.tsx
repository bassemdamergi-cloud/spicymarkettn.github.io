
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';

const AdminVerificationPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const verificationCode = '2086'; // The required code

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (code === verificationCode) {
      sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError(t('adminVerify.incorrectCodeError'));
      setCode('');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">{t('adminVerify.title')}</h1>
          <p className="text-gray-400 mt-2">{t('adminVerify.subtitle')}</p>
        </div>
        <form className="space-y-6" onSubmit={handleVerification}>
          <div>
            <label htmlFor="verification-code" className="text-sm font-bold text-gray-300 block mb-2">
              {t('adminVerify.codeLabel')}
            </label>
            <input
              id="verification-code"
              name="verification-code"
              type="password" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••"
              aria-label={t('adminVerify.codeLabel')}
              required
              autoFocus
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold transition-colors duration-200"
          >
            {t('adminVerify.verifyButton')}
          </button>
        </form>
        <div className="text-center pt-4 border-t border-gray-700">
          <Link 
            to="/" 
            className="font-bold text-blue-500 hover:text-blue-600 transition-colors"
          >
            &larr; {t('adminVerify.backToLogin')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminVerificationPage;