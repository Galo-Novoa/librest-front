import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Loader2 } from 'lucide-react';
import { useCartStore } from '../../../../app/store/cartStore';
import { ErrorMessage, LoadingSpinner } from '../../../../shared/ui';

export const CartPage = () => {
  const { 
    cart, 
    loading, 
    error, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalPrice,
    retry 
  } = useCartStore();

  const handleCheckout = () => {
    alert('¡Funcionalidad de checkout en desarrollo!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-lime-600" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} onRetry={retry} />
      </div>
    );
  }

  if (cart.length === 0) {
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR").format(price);
  };

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
          disabled={loading}
        >
          <Trash2 size={20} />
          Vaciar carrito
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {cart.map((item) => (
          <div key={item.id} className="border-b border-gray-200 last:border-b-0">
            <div className="flex items-center p-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                }}
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{item.product.description}</p>
                <p className="text-xl font-bold text-lime-600 mt-1">
                  ${formatPrice(Number(item.product.price))}
                </p>
              </div>

              <div className="flex items-center gap-3 mr-4">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  disabled={loading}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  disabled={loading}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">
                  ${formatPrice(Number(item.product.price) * item.quantity)}
                </p>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  disabled={loading}
                  className="text-red-500 hover:text-red-700 transition-colors mt-2 flex items-center gap-1 text-sm disabled:opacity-50"
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
            ${formatPrice(totalPrice)}
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
            disabled={loading}
            className="flex-1 bg-lime-500 text-white py-3 px-6 rounded-lg hover:bg-lime-600 transition-colors font-semibold disabled:opacity-50"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};