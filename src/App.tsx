// ./src/App.tsx
import { NavBar } from './features/layout';
import { AppRouter } from './app/router';
import { Toast } from './shared/ui';
import { useCartStore } from './app/store/cartStore';
import { useEffect } from 'react';
import { useToast } from './shared/lib/useToast';

export default function App() {
  const { toast, hideToast } = useToast();
  const { loadCart } = useCartStore();

  // Cargar carrito al iniciar la app
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <div className="flex flex-col h-screen bg-lime-100 overflow-y-auto">
      <NavBar /> {/* ← SIN PROPS */}
      <div className="flex-1">
        <AppRouter />
      </div>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}