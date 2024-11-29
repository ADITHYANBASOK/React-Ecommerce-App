import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar cartItemCount={cart.length} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
            <Route 
              path="/categories" 
              element={<CategoryPage onAddToCart={addToCart} />} 
            />
            <Route 
              path="/product/:id" 
              element={<ProductDetailsPage onAddToCart={addToCart} />} 
            />
            <Route 
              path="/cart" 
              element={<CartPage cart={cart} onRemoveFromCart={removeFromCart} />} 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;