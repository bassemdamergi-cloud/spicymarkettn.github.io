
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, CategoryIcon, OrdersIcon, AccountIcon } from './icons';
import { useTranslation } from '../lib/i18n';

const BottomNavBar: React.FC = () => {
  const { t } = useTranslation();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center flex-1 p-2 transition-colors duration-200 ${
      isActive ? 'text-yellow-400' : 'text-gray-400 hover:text-white'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-gray-800 border-t border-gray-700 shadow-lg">
      <div className="flex h-full max-w-lg mx-auto">
        <NavLink to="/home" className={getLinkClass}>
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs font-medium">{t('nav.home')}</span>
        </NavLink>
        <NavLink to="/categories" className={getLinkClass}>
          <CategoryIcon className="w-6 h-6" />
          <span className="text-xs font-medium">{t('nav.categories')}</span>
        </NavLink>
        <NavLink to="/orders" className={getLinkClass}>
          <OrdersIcon className="w-6 h-6" />
          <span className="text-xs font-medium">{t('nav.orders')}</span>
        </NavLink>
        <NavLink to="/account" className={getLinkClass}>
          <AccountIcon className="w-6 h-6" />
          <span className="text-xs font-medium">{t('nav.account')}</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavBar;
