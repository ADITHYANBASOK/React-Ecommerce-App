function AddToCartButton({ product, onAddToCart }) {
  return (
    <button
      onClick={() => onAddToCart(product)}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;