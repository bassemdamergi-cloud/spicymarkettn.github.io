
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { DashboardIcon, PackageIcon, OrdersIcon, AccountIcon, FileIcon } from './icons';
import { useTranslation } from '../lib/i18n';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-lg transition-colors duration-200 rounded-lg ${
      isActive ? 'bg-yellow-500 text-gray-900 font-bold' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 flex flex-col p-4 border-r border-gray-700">
        <div className="text-2xl font-bold text-center mb-8">
            <span className="text-yellow-400">{t('adminLayout.titleAdmin')}</span><span className="text-white">{t('adminLayout.titlePanel')}</span>
        </div>
        <nav className="flex-grow space-y-2">
          <NavLink to="/admin/dashboard" className={getLinkClass}>
            <DashboardIcon className="w-6 h-6 me-3" />
            {t('adminLayout.dashboard')}
          </NavLink>
          <NavLink to="/admin/products" className={getLinkClass}>
            <PackageIcon className="w-6 h-6 me-3" />
            {t('adminLayout.products')}
          </NavLink>
          <NavLink to="/admin/orders" className={getLinkClass}>
            <OrdersIcon className="w-6 h-6 me-3" />
            {t('adminLayout.orders')}
          </NavLink>
          <NavLink to="/admin/list" className={getLinkClass}>
            <FileIcon className="w-6 h-6 me-3" />
            {t('adminLayout.orderList')}
          </NavLink>
          <NavLink to="/admin/users" className={getLinkClass}>
            <AccountIcon className="w-6 h-6 me-3" />
            {t('adminLayout.users')}
          </NavLink>
        </nav>
        <div className="mt-auto">
            <button
                onClick={handleLogout}
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold transition-colors duration-200"
            >
                {t('adminLayout.logOut')}
            </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;