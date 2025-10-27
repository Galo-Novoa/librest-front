import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link 
        to="/"
        className="flex items-center gap-2 text-lime-600 hover:text-lime-700 transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        Volver a la tienda
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Detalles del Producto #{id}
        </h1>
        <p className="text-gray-600">
          Página en desarrollo - Próximamente disponible
        </p>
      </div>
    </div>
  );
};