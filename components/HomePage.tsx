
import React, { useState, useEffect } from 'react';
import { StarIcon } from './icons';
import { useTranslation } from '../lib/i18n';

export interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Wireless Bluetooth Headphones', price: '$89.99', rating: 4.5, reviewCount: 188, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, name: 'Smartwatch with Fitness Tracker', price: '$159.50', rating: 4.8, reviewCount: 245, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop' },
  { id: 3, name: 'Portable Espresso Machine', price: '$65.00', rating: 4.2, reviewCount: 98, imageUrl: 'https://images.unsplash.com/photo-1579633232142-f1451f579307?q=80&w=1964&auto=format&fit=crop' },
  { id: 4, name: 'Vintage Leather Backpack', price: '$120.00', rating: 4.9, reviewCount: 312, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb68faf7a?q=80&w=1974&auto=format&fit=crop' },
  { id: 5, name: 'Organic Green Tea Set', price: '$25.99', rating: 4.6, reviewCount: 78, imageUrl: 'https://images.unsplash.com/photo-1578899859488-2a28b3a134a4?q=80&w=1974&auto=format&fit=crop' },
  { id: 6, name: 'Modern Desk Lamp', price: '$45.00', rating: 4.4, reviewCount: 150, imageUrl: 'https://images.unsplash.com/photo-1543393933-057e04f5a34e?q=80&w=2074&auto=format&fit=crop' },
  { id: 7, name: 'High-Performance Gaming Mouse', price: '$79.99', rating: 4.7, reviewCount: 450, imageUrl: 'https://images.unsplash.com/photo-1615663249852-de3617349942?q=80&w=2070&auto=format&fit=crop' },
  { id: 8, name: 'Professional DSLR Camera', price: '$899.00', rating: 4.9, reviewCount: 560, imageUrl: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=1964&auto=format&fit=crop' },
];

const getProducts = (): Product[] => {
  try {
    const productsJSON = localStorage.getItem('product_database');
    if (productsJSON) {
      return JSON.parse(productsJSON);
    } else {
      localStorage.setItem('product_database', JSON.stringify(initialProducts));
      return initialProducts;
    }
  } catch (error) {
    console.error("Failed to parse products from localStorage", error);
    return initialProducts;
  }
};


const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <StarIcon 
          key={index} 
          className={`w-4 h-4 ${rating >= starValue ? 'text-yellow-400' : 'text-gray-500'}`} 
          isFilled={rating >= starValue}
        />
      );
    })}
  </div>
);

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void; }> = ({ product, onAddToCart }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-gray-200 truncate flex-grow">{product.name}</h3>
        <div className="flex items-center mt-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400 ms-2">({product.reviewCount})</span>
        </div>
        <p className="text-xl font-bold text-white mt-2">{product.price}</p>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full mt-4 py-2 px-4 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-gray-900 font-bold transition-colors duration-200"
        >
          {t('home.addToCart')}
        </button>
      </div>
    </div>
  );
};

const HomePage: React.FC<{ onAddToCart: (product: Product) => void }> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-full animate-fade-in">
      <h1 className="text-3xl font-bold text-white mb-6">{t('home.title')}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
