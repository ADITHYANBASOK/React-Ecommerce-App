import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            Rs{product.price.toFixed(2)}
          </span>
          <div className="space-x-2">
            <Link
              to={`/product/${product.id}`}
              className="inline-block px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              View Details
            </Link>
            <button
              onClick={() => onAddToCart(product)}
              className="inline-block px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;