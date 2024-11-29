import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetailsPage({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        // Fetch the primary product data
        const productRes = await axios.get(`https://fakestoreapi.com/products/${id}`);
        const product = productRes.data;
        setProduct(product);
  
        // Fetch related products in the same category, excluding the current product
        const relatedRes = await axios.get(`https://fakestoreapi.com/products/category/${product.category}`);
        setRelatedProducts(
          relatedRes.data.filter(p => p.id !== parseInt(id)).slice(0, 4)
        );
      } catch (err) {
        setError('Failed to fetch product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center text-red-600 text-xl">
        {error || 'Product not found'}
      </div>
    );
  }

  return (
    <div className="w-10/12 mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full h-auto max-h-[500px] object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="text-4xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </div>
            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map(related => (
            <div key={related.id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={related.image}
                alt={related.title}
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {related.title}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ${related.price.toFixed(2)}
                </span>
                <button
                  onClick={() => onAddToCart(related)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;