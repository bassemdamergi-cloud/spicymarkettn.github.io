
import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage, { Product } from './components/HomePage';
import SignInPage from './components/SignInPage';
import BottomNavBar from './components/BottomNavBar';
import CategoriesPage from './components/CategoriesPage';
import OrdersPage from './components/OrdersPage';
import AccountPage from './components/AccountPage';
import Header from './components/Header';
import SignUpPage from './components/SignUpPage';
import AdminPage from './components/AdminPage';
import AdminVerificationPage from './components/AdminVerificationPage';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import AdminProductsPage from './components/AdminProductsPage';
import AdminOrdersPage from './components/AdminOrdersPage';
import AdminListPage from './components/AdminListPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useTranslation } from './lib/i18n';


export interface OrderItem {
  product: Product;
  quantity: number;
}

const App: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const showNavBar = !['/', '/signup', '/admin-verify'].includes(location.pathname) && !location.pathname.startsWith('/admin');
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setOrders(prevOrders => {
      const existingOrder = prevOrders.find(order => order.product.id === product.id);
      if (existingOrder) {
        return prevOrders.map(order =>
          order.product.id === product.id
            ? { ...order, quantity: order.quantity + 1 }
            : order
        );
      } else {
        return [...prevOrders, { product, quantity: 1 }];
      }
    });
    alert(t('home.productAddedToCart', { productName: product.name }));
  };

  const handleDeleteOrder = (productId: number) => {
    setOrders(prevOrders => prevOrders.filter(order => order.product.id !== productId));
  };

  const handleUpdateOrderQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleDeleteOrder(productId);
    } else {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.product.id === productId
            ? { ...order, quantity: newQuantity }
            : order
        )
      );
    }
  };
  
  const handlePlaceOrder = () => {
    if (orders.length === 0) {
      alert(t('orders.emptyCartAlert'));
      return;
    }
    const ordersJSON = localStorage.getItem('orders_database');
    const allOrders = ordersJSON ? JSON.parse(ordersJSON) : [];
    const newOrder = {
        orderId: Date.now(),
        items: orders,
        total: orders.reduce((total, order) => {
            const price = parseFloat(order.product.price.replace('$', ''));
            return total + price * order.quantity;
        }, 0),
        date: new Date().toISOString(),
    };
    const updatedOrders = [...allOrders, newOrder];
    localStorage.setItem('orders_database', JSON.stringify(updatedOrders));
    
    // Also save just the order number to a separate database, with each on a new line.
    const orderNumbersText = localStorage.getItem('order_number_database') || '';
    const updatedOrderNumbersText = orderNumbersText 
        ? `${orderNumbersText}\n${newOrder.orderId}`
        : String(newOrder.orderId);
    localStorage.setItem('order_number_database', updatedOrderNumbersText);


    alert(t('orders.orderPlacedAlert', { orderId: newOrder.orderId }));
    setOrders([]); // Clear the cart
  };


  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-col font-sans overflow-hidden">
      {showNavBar && <Header orders={orders} />}
      <main className={`flex-grow overflow-y-auto custom-scrollbar ${showNavBar ? 'pb-20' : ''}`}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin-verify" element={<AdminVerificationPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* User-facing routes */}
            <Route path="/home" element={<HomePage onAddToCart={handleAddToCart} />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route 
              path="/orders" 
              element={<OrdersPage orders={orders} onDeleteOrder={handleDeleteOrder} onUpdateOrderQuantity={handleUpdateOrderQuantity} onPlaceOrder={handlePlaceOrder} />} 
            />
            <Route path="/account" element={<AccountPage />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="list" element={<AdminListPage />} />
              <Route path="users" element={<AdminPage />} />
            </Route>
          </Route>
        </Routes>
      </main>
      {showNavBar && <BottomNavBar />}
    </div>
  );
};

export default App;