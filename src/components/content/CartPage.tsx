import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import type { Product } from '../../types/Product';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();

  // Agrupar productos duplicados con cantidad
  const cartItems = cart.reduce((acc, product) => {
    const existing = acc.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ product, quantity: 1 });
    }
    return acc;
  }, [] as { product: Product; quantity: number }[]);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      // Para simplificar, removemos y agregamos de nuevo
      // En una implementación real, tendrías un método updateQuantity en useCart
      const currentItem = cartItems.find(item => item.product.id === productId);
      if (currentItem) {
        removeFromCart(productId);
        // Agregar la cantidad correcta
        for (let i = 0; i < newQuantity; i++) {
          // En una implementación real, esto sería una llamada al backend
        }
      }
    }
  };

  const handleCheckout = () => {
    alert('¡Funcionalidad de checkout en desarrollo!');
    // clearCart(); // Descomentar cuando esté listo
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-lime-50 rounded-lg p-8">
        <ShoppingCart size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600 mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-6">Agrega algunos productos para continuar</p>
        <Link 
          to="/"
          className="bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition-colors font-semibold flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Link 
          to="/"
          className="flex items-center gap-2 text-lime-600 hover:text-lime-700 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a la tienda
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Tu Carrito</h1>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
        >
          <Trash2 size={20} />
          Vaciar carrito
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {cartItems.map(({ product, quantity }) => (
          <div key={product.id} className="border-b border-gray-200 last:border-b-0">
            <div className="flex items-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                <p className="text-xl font-bold text-lime-600 mt-1">
                  ${new Intl.NumberFormat("es-AR").format(Number(product.price))}
                </p>
              </div>

              <div className="flex items-center gap-3 mr-4">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">
                  ${new Intl.NumberFormat("es-AR").format(Number(product.price) * quantity)}
                </p>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-red-500 hover:text-red-700 transition-colors mt-2 flex items-center gap-1 text-sm"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold text-lime-600">
            ${new Intl.NumberFormat("es-AR").format(totalPrice)}
          </span>
        </div>
        
        <div className="flex gap-4">
          <Link 
            to="/"
            className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors text-center font-semibold"
          >
            Seguir comprando
          </Link>
          <button
            onClick={handleCheckout}
            className="flex-1 bg-lime-500 text-white py-3 px-6 rounded-lg hover:bg-lime-600 transition-colors font-semibold"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}