import { NavBar } from './features/layout';
import { AppRouter } from './app/router';
import { Toast } from './shared/ui';
import { useCartStore } from './app/store/cartStore';
import { useEffect } from 'react';
import { useToast } from './shared/lib/useToast'; // Importación corregida

export default function App() {
  const { toast, hideToast } = useToast(); // Removí showToast que no se usa
  const { loadCart } = useCartStore();

  // Cargar carrito al iniciar la app
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <div className="flex flex-col h-screen bg-lime-100 overflow-y-auto">
      <NavBar setTerm={() => {}} /> {/* setTerm se manejará en HomePage */}
      <div className="flex-1">
        <AppRouter />
      </div>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}