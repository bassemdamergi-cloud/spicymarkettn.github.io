
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../lib/i18n';

interface StatCardProps {
    title: string;
    value: number;
    description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
        <p className="text-4xl font-bold text-white mt-2">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
);

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({ products: 0, users: 0, orders: 0 });
    const { t } = useTranslation();

    useEffect(() => {
        const productsJSON = localStorage.getItem('product_database');
        const products = productsJSON ? JSON.parse(productsJSON) : [];

        const regularUsersJSON = localStorage.getItem('user_database');
        const adminUsersJSON = localStorage.getItem('admin_database');
        const regularUsers = regularUsersJSON ? JSON.parse(regularUsersJSON) : [];
        const adminUsers = adminUsersJSON ? JSON.parse(adminUsersJSON) : [];
        
        const orderNumbersText = localStorage.getItem('order_number_database');
        let orderCount = 0;
        if (orderNumbersText) {
            orderCount = orderNumbersText.split('\n').filter(line => line.trim() !== '').length;
        }

        setStats({
            products: products.length,
            users: regularUsers.length + adminUsers.length,
            orders: orderCount,
        });
    }, []);

    return (
        <div className="animate-fade-in space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">{t('adminDashboard.title')}</h1>
                <p className="text-gray-400 mt-1">{t('adminDashboard.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    title={t('adminDashboard.totalProductsTitle')} 
                    value={stats.products} 
                    description={t('adminDashboard.totalProductsDesc')} 
                />
                <StatCard 
                    title={t('adminDashboard.totalUsersTitle')} 
                    value={stats.users} 
                    description={t('adminDashboard.totalUsersDesc')} 
                />
                <StatCard 
                    title={t('adminDashboard.totalOrdersTitle')} 
                    value={stats.orders} 
                    description={t('adminDashboard.totalOrdersDesc')} 
                />
            </div>
        </div>
    );
};

export default AdminDashboard;