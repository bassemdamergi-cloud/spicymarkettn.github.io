
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AccountIcon, BasketIcon } from './icons';
import { OrderItem } from '../App';
import { useTranslation } from '../lib/i18n';

interface HeaderProps {
    orders: OrderItem[];
}

const Header: React.FC<HeaderProps> = ({ orders }) => {
    const { t } = useTranslation();
    const totalItems = orders.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-gray-800 border-b border-gray-700 p-4 shadow-md sticky top-0 z-20">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <NavLink to="/home" className="text-xl font-bold">
                   <span className="text-yellow-400">{t('header.appNameSpicy')}</span><span className="text-white">{t('header.appNameMarket')}</span>
                </NavLink>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <NavLink to="/orders" className="relative text-gray-300 hover:text-white transition-colors">
                        <BasketIcon className="w-7 h-7" />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 rtl:right-auto rtl:-left-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-gray-800">
                                {totalItems}
                            </span>
                        )}
                    </NavLink>
                    <NavLink to="/account" className="text-gray-300 hover:text-white transition-colors">
                        <AccountIcon className="w-7 h-7" />
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;
