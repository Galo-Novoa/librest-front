import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, CheckCircle, XCircle, Wallet } from 'lucide-react';
import { useCartStore } from '../../../app/store/cartStore';
import { useBalanceStore } from '../../../app/store/balanceStore';
import { useToast } from '../../../shared/lib/useToast';
import { useState } from 'react';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCartStore();
  const { balance, withdraw} = useBalanceStore();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR').format(price);
  };

  const handleCheckout = async () => {
    if (totalPrice === 0) {
      showToast('El carrito está vacío', 'error');
      return;
    }

    if (balance < totalPrice) {
      showToast('Saldo insuficiente para realizar la compra', 'error');
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      const success = withdraw(totalPrice);
      
      if (success) {
        showToast(`¡Compra exitosa! Se descontaron $${formatPrice(totalPrice)}`, 'success');
        clearCart();
        navigate('/');
      } else {
        showToast('Error al procesar el pago', 'error');
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-lime-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Carrito vacío</h2>
          <p className="text-gray-500 mb-6">Agrega productos al carrito antes de finalizar la compra</p>
          <Link 
            to="/"
            className="bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition-colors font-semibold"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lime-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/cart"
            className="flex items-center gap-2 text-lime-600 hover:text-lime-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al carrito
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Finalizar Compra</h1>
          <div className="w-20"></div> {/* Espaciador para centrar el título */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resumen de la compra */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen de la compra</h2>
              
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-lime-600">
                      ${formatPrice(Number(item.product.price) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-2xl text-lime-600">${formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Información de envío */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Información de envío</h2>
              <div className="space-y-3 text-gray-600">
                <p><span className="font-semibold">Dirección:</span> Calle Falsa 123, Buenos Aires</p>
                <p><span className="font-semibold">Método de envío:</span> Estándar (3-5 días)</p>
                <p><span className="font-semibold">Costo de envío:</span> Gratis</p>
              </div>
            </div>
          </div>

          {/* Panel de pago */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Wallet className="text-lime-600" />
                Método de pago
              </h2>
              
              <div className="space-y-4">
                {/* Saldo disponible */}
                <div className="bg-lime-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Saldo disponible:</span>
                    <span className={`text-lg font-bold ${balance >= totalPrice ? 'text-green-600' : 'text-red-600'}`}>
                      ${formatPrice(balance)}
                    </span>
                  </div>
                  
                  {balance < totalPrice && (
                    <p className="text-sm text-red-600 mt-2">
                      Saldo insuficiente. Necesitas ${formatPrice(totalPrice - balance)} más.
                    </p>
                  )}
                </div>

                {/* Botón de pago */}
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || balance < totalPrice}
                  className="w-full bg-lime-500 text-white py-4 px-6 rounded-lg hover:bg-lime-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <CreditCard size={24} />
                      Pagar ${formatPrice(totalPrice)}
                    </>
                  )}
                </button>

                {balance >= totalPrice && (
                  <p className="text-sm text-green-600 text-center">
                    <CheckCircle size={16} className="inline mr-1" />
                    Saldo suficiente para la compra
                  </p>
                )}
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Información importante</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• El saldo se descontará automáticamente</li>
                <li>• Recibirás un email de confirmación</li>
                <li>• Podés recargar saldo en cualquier momento</li>
                <li>• Envío gratis en compras mayores a $0</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};