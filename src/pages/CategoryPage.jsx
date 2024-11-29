import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import CategorySidebar from '../components/CategorySidebar';
import ProductSort from '../components/ProductSort';

function CategoryPage({ onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'default';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          currentCategory === 'all'
            ? axios.get('https://fakestoreapi.com/products')
            : axios.get(`https://fakestoreapi.com/products/category/${currentCategory}`),
          axios.get('https://fakestoreapi.com/products/categories')
        ]);

        let sortedProducts = productsRes.data;
        switch (currentSort) {
          case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
          case 'name-asc':
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'name-desc':
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
            break;
        }

        setProducts(sortedProducts);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentCategory, currentSort]);

  const handleCategoryChange = (category) => {
    setSearchParams({ category, sort: currentSort });
  };

  const handleSortChange = (sort) => {
    setSearchParams({ category: currentCategory, sort });
  };

  if (error) {
    return (
      <div className="text-center text-red-600 text-xl py-12">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64 flex-shrink-0">
          <CategorySidebar
            categories={categories}
            currentCategory={currentCategory}
            onCategoryChange={handleCategoryChange}
          />
        </aside>

        <main className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {currentCategory === 'all' ? 'All Products' : currentCategory}
            </h1>
            <ProductSort
              currentSort={currentSort}
              onSortChange={handleSortChange}
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CategoryPage;