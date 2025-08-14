
import React, { useState, useEffect } from 'react';
import { OrderItem } from '../App';
import { useTranslation } from '../lib/i18n';

interface PlacedOrder {
    orderId: number;
    items: OrderItem[];
    total: number;
    date: string;
}

const AdminOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<PlacedOrder[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const ordersJSON = localStorage.getItem('orders_database');
        if (ordersJSON) {
            const parsedOrders = JSON.parse(ordersJSON);
            // Sort by most recent first
            parsedOrders.sort((a: PlacedOrder, b: PlacedOrder) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setOrders(parsedOrders);
        }
    }, []);

    return (
        <div className="animate-fade-in space-y-8">
             <div>
                <h1 className="text-3xl font-bold text-white">{t('adminOrders.title')}</h1>
                <p className="text-gray-400 mt-1">{t('adminOrders.subtitle')}</p>
            </div>
            
            <div className="space-y-6">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.orderId} className="bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-yellow-400">{t('adminOrders.orderIdLabel')} #{order.orderId}</h2>
                                    <p className="text-sm text-gray-400">{new Date(order.date).toLocaleString()}</p>
                                </div>
                                <p className="text-2xl font-bold text-white">${order.total.toFixed(2)}</p>
                            </div>
                            <div className="border-t border-gray-700 pt-4">
                                <h3 className="font-semibold mb-2">{t('adminOrders.itemsLabel')}:</h3>
                                <ul className="space-y-2">
                                    {order.items.map(item => (
                                        <li key={item.product.id} className="flex items-center">
                                            <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded me-4"/>
                                            <div>
                                                <p className="font-medium text-gray-200">{item.product.name}</p>
                                                <p className="text-sm text-gray-400">{t('adminOrders.quantityLabel')}: {item.quantity} &times; {item.product.price}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-gray-800 p-8 rounded-lg text-center">
                        <p className="text-gray-400">{t('adminOrders.noOrders')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrdersPage;
