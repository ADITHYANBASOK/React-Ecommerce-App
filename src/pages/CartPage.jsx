function CartPage({ cart, onRemoveFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600">Add some products to your cart to see them here.</p>
      </div>
    );
  }

  return (
    <div className="w-10/12 mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.cartId} className="flex items-center justify-between border-b border-gray-200 pb-6">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain mr-6"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => onRemoveFromCart(item.cartId)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;