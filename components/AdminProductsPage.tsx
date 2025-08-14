
import React, { useState, useEffect } from 'react';
import { Product } from './HomePage';
import { TrashIcon } from './icons';
import { useTranslation } from '../lib/i18n';

const AdminProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', imageUrl: '' });
    const { t } = useTranslation();

    const loadProducts = () => {
        const productsJSON = localStorage.getItem('product_database');
        if (productsJSON) {
            setProducts(JSON.parse(productsJSON));
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const saveProducts = (updatedProducts: Product[]) => {
        localStorage.setItem('product_database', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
    };

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        const newProd: Product = {
            id: Date.now(),
            name: newProduct.name,
            price: `$${parseFloat(newProduct.price).toFixed(2)}`,
            imageUrl: newProduct.imageUrl,
            rating: 0,
            reviewCount: 0,
        };
        saveProducts([...products, newProd]);
        setNewProduct({ name: '', price: '', imageUrl: '' });
    };

    const handleDeleteProduct = (id: number) => {
        if (window.confirm(t('adminProducts.deleteConfirm'))) {
            const updatedProducts = products.filter(p => p.id !== id);
            saveProducts(updatedProducts);
        }
    };
    
    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleUpdateProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;
        const updatedProducts = products.map(p => p.id === editingProduct.id ? editingProduct : p);
        saveProducts(updatedProducts);
        setIsModalOpen(false);
        setEditingProduct(null);
    };
    
    const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editingProduct) {
            setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
        }
    };

    return (
        <div className="animate-fade-in space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">{t('adminProducts.title')}</h1>
                <p className="text-gray-400 mt-1">{t('adminProducts.subtitle')}</p>
            </div>

            {/* Add Product Form */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-white mb-4">{t('adminProducts.addNewProduct')}</h2>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder={t('adminProducts.productNamePlaceholder')} className="p-2 bg-gray-700 rounded border border-gray-600 w-full" required />
                    <input value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} type="number" step="0.01" placeholder={t('adminProducts.pricePlaceholder')} className="p-2 bg-gray-700 rounded border border-gray-600 w-full" required />
                    <input value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} placeholder={t('adminProducts.imageUrlPlaceholder')} className="p-2 bg-gray-700 rounded border border-gray-600 w-full" required />
                    <button type="submit" className="md:col-start-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto justify-self-end">{t('adminProducts.addProductButton')}</button>
                </form>
            </div>

            {/* Product List */}
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="p-4">{t('adminProducts.tableHeaderImage')}</th>
                            <th className="p-4">{t('adminProducts.tableHeaderName')}</th>
                            <th className="p-4">{t('adminProducts.tableHeaderPrice')}</th>
                            <th className="p-4">{t('adminProducts.tableHeaderActions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-gray-700 last:border-0">
                                <td className="p-2"><img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded"/></td>
                                <td className="p-4 font-medium">{product.name}</td>
                                <td className="p-4">{product.price}</td>
                                <td className="p-4 space-x-2 rtl:space-x-reverse">
                                    <button onClick={() => handleEditProduct(product)} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-1 px-3 rounded text-sm">{t('adminProducts.editButton')}</button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">{t('adminProducts.deleteButton')}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isModalOpen && editingProduct && (
                 <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">{t('adminProducts.editModalTitle')}</h2>
                        <form onSubmit={handleUpdateProduct} className="space-y-4">
                            <input name="name" value={editingProduct.name} onChange={handleModalInputChange} placeholder={t('adminProducts.productNamePlaceholder')} className="p-3 bg-gray-700 rounded border border-gray-600 w-full" />
                            <input name="price" value={editingProduct.price} onChange={handleModalInputChange} placeholder={t('adminProducts.pricePlaceholder')} className="p-3 bg-gray-700 rounded border border-gray-600 w-full" />
                            <input name="imageUrl" value={editingProduct.imageUrl} onChange={handleModalInputChange} placeholder={t('adminProducts.imageUrlPlaceholder')} className="p-3 bg-gray-700 rounded border border-gray-600 w-full" />
                            <div className="flex justify-end space-x-4 rtl:space-x-reverse pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">{t('adminProducts.cancelButton')}</button>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{t('adminProducts.saveButton')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductsPage;
