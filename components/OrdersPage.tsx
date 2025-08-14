
import React from 'react';
import { OrderItem } from '../App';
import { TrashIcon } from './icons';
import { useTranslation } from '../lib/i18n';

interface OrdersPageProps {
  orders: OrderItem[];
  onDeleteOrder: (productId: number) => void;
  onUpdateOrderQuantity: (productId: number, newQuantity: number) => void;
  onPlaceOrder: () => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ orders, onDeleteOrder, onUpdateOrderQuantity, onPlaceOrder }) => {
  const { t } = useTranslation();
  const totalPrice = orders.reduce((total, order) => {
    const price = parseFloat(order.product.price.replace('$', ''));
    return total + price * order.quantity;
  }, 0);

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-full text-white animate-fade-in pb-28">
      <h1 className="text-3xl font-bold mb-6">{t('orders.title')}</h1>
      {orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-300">{t('orders.emptyMessage')}</h2>
          <p className="mt-2 text-gray-400">{t('orders.emptyHint')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.product.id} className="bg-gray-800 rounded-lg p-4 flex items-center shadow-lg transition-transform hover:shadow-xl hover:scale-[1.02]">
              <img src={order.product.imageUrl} alt={order.product.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md me-4 flex-shrink-0" />
              <div className="flex-grow min-w-0">
                <h2 className="font-semibold text-gray-200 truncate">{order.product.name}</h2>
                <p className="text-lg font-bold text-white mt-1">{order.product.price}</p>
                 <div className="flex items-center mt-2">
                  <button 
                    onClick={() => onUpdateOrderQuantity(order.product.id, order.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-700 text-lg font-bold hover:bg-gray-600 transition-colors"
                    aria-label={t('orders.decreaseQuantity')}
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-lg font-semibold">{order.quantity}</span>
                  <button 
                    onClick={() => onUpdateOrderQuantity(order.product.id, order.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-700 text-lg font-bold hover:bg-gray-600 transition-colors"
                    aria-label={t('orders.increaseQuantity')}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center ms-4 flex-shrink-0">
                <button
                  onClick={() => onDeleteOrder(order.product.id)}
                  className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-700 transition-colors"
                  aria-label={t('orders.deleteOrder')}
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {orders.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 p-4">
            <div className="max-w-lg mx-auto flex justify-between items-center">
                <div>
                    <p className="text-gray-400 text-sm">{t('orders.total')}</p>
                    <p className="text-white text-2xl font-bold">${totalPrice.toFixed(2)}</p>
                </div>
                <button
                    onClick={onPlaceOrder}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                    {t('orders.placeOrder')}
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
