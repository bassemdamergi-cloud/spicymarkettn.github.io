
import React, { useState, useEffect } from 'react';
import { OrderItem } from '../App';
import { ChevronDownIcon, ChevronRightIcon } from './icons';
import { useTranslation } from '../lib/i18n';

interface PlacedOrder {
    orderId: number;
    items: OrderItem[];
    total: number;
    date: string;
}

const AdminListPage: React.FC = () => {
    const [orders, setOrders] = useState<PlacedOrder[]>([]);
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const ordersJSON = localStorage.getItem('orders_database');
        if (ordersJSON) {
            const parsedOrders: PlacedOrder[] = JSON.parse(ordersJSON);
            parsedOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setOrders(parsedOrders);
        }
    }, []);

    const toggleExpand = (orderId: number) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    return (
        <div className="animate-fade-in space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">{t('adminList.title')}</h1>
                <p className="text-gray-400 mt-1">{t('adminList.subtitle')}</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-left min-w-[600px] rtl:text-right">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4 w-12"></th>
                            <th className="p-4">{t('adminList.tableHeaderId')}</th>
                            <th className="p-4">{t('adminList.tableHeaderDateTime')}</th>
                            <th className="p-4 text-right rtl:text-left">{t('adminList.tableHeaderTotal')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <React.Fragment key={order.orderId}>
                                    <tr 
                                        className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 cursor-pointer"
                                        onClick={() => toggleExpand(order.orderId)}
                                    >
                                        <td className="p-4">
                                            {expandedOrderId === order.orderId ? (
                                                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <ChevronRightIcon className="w-5 h-5 text-gray-400 transform rtl:rotate-180" />
                                            )}
                                        </td>
                                        <td className="p-4 font-medium text-yellow-400">#{order.orderId}</td>
                                        <td className="p-4 text-gray-300">{new Date(order.date).toLocaleString()}</td>
                                        <td className="p-4 text-right rtl:text-left font-bold text-white">${order.total.toFixed(2)}</td>
                                    </tr>
                                    {expandedOrderId === order.orderId && (
                                        <tr className="bg-gray-800">
                                            <td colSpan={4} className="p-0">
                                                <div className="p-4 bg-gray-900/50">
                                                    <h3 className="font-semibold mb-3 text-lg text-white">{t('adminList.productsInOrder')}</h3>
                                                    <ul className="space-y-3">
                                                        {order.items.map(item => (
                                                            <li key={item.product.id} className="flex items-center bg-gray-800 p-2 rounded-md">
                                                                <img src={item.product.imageUrl} alt={item.product.name} className="w-14 h-14 object-cover rounded me-4"/>
                                                                <div className="flex-grow">
                                                                    <p className="font-medium text-gray-200">{item.product.name}</p>
                                                                    <p className="text-sm text-gray-400">
                                                                        {item.quantity} &times; {item.product.price}
                                                                    </p>
                                                                </div>
                                                                <p className="font-semibold text-white ms-4">
                                                                    ${(parseFloat(item.product.price.replace('$', '')) * item.quantity).toFixed(2)}
                                                                </p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-400">
                                    {t('adminList.noOrders')}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminListPage;
