import React from 'react';
import { useTranslation } from '../lib/i18n';

interface Category {
  key: string;
  name: string;
  imageUrl: string;
}

const categoriesData: {key: string, imageUrl: string}[] = [
  { key: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1964&auto=format&fit=crop' },
  { key: 'books', imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1887&auto=format&fit=crop' },
  { key: 'homeAndKitchen', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop' },
  { key: 'fashion', imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop' },
  { key: 'toysAndGames', imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=2070&auto=format&fit=crop' },
  { key: 'beautyAndPersonalCare', imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1887&auto=format&fit=crop' },
  { key: 'sportsAndOutdoors', imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop' },
  { key: 'automotive', imageUrl: 'https://images.unsplash.com/photo-1553523825-4c316bda3932?q=80&w=2070&auto=format&fit=crop' },
];

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
    const { t } = useTranslation();
    return (
      <div 
        onClick={() => alert(t('categories.navigateTo', { categoryName: category.name }))}
        className="relative rounded-lg overflow-hidden h-40 group cursor-pointer shadow-lg"
      >
        <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-60">
          <h2 className="text-white text-xl font-bold text-center p-2">{category.name}</h2>
        </div>
      </div>
    );
}


const CategoriesPage: React.FC = () => {
  const { t } = useTranslation();

  const categories: Category[] = categoriesData.map(cat => ({
    ...cat,
    name: t(`categories.categoryNames.${cat.key}`)
  }));

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-full text-white animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">{t('categories.title')}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.key} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
