
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useTranslation();

  const handleDisconnect = () => {
    sessionStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const accountOptionKeys = [
    'editProfile',
    'changePassword',
    'paymentMethods',
    'orderHistory',
    'notifications',
    'privacySettings',
  ];

  const LanguageSwitcher: React.FC = () => {
    const languages: { code: 'en' | 'fr' | 'ar', name: string }[] = [
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'Français' },
      { code: 'ar', name: 'العربية' },
    ];
    
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-white">{t('account.language')}</h2>
        <div className="flex space-x-2 rtl:space-x-reverse">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex-1 py-2 px-4 rounded-lg font-bold transition-colors duration-200 ${
                language === lang.code
                  ? 'bg-yellow-500 text-gray-900'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-full text-white animate-fade-in flex flex-col">
      <h1 className="text-3xl font-bold mb-6">{t('account.title')}</h1>
      
      <div className="flex-grow space-y-3">
        {accountOptionKeys.map(key => (
           <button 
             key={key}
             onClick={() => alert(t('account.featureNotImplemented', { featureName: t(`account.options.${key}`) }))}
             className="w-full text-left p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex justify-between items-center"
             aria-label={t(`account.options.${key}`)}
           >
             <span>{t(`account.options.${key}`)}</span>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transform rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
           </button>
        ))}
      </div>
      
      <LanguageSwitcher />

      <div className="mt-8">
        <button
          onClick={handleDisconnect}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition-colors duration-200 shadow-md hover:shadow-lg"
          aria-label={t('account.disconnectAriaLabel')}
        >
          {t('account.disconnect')}
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
