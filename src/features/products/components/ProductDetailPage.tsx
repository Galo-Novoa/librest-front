// ./src/features/products/components/ProductDetailPage.tsx
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '../../../app/store/cartStore';
import { useToast } from '../../../shared/lib/useToast';
import { LoadingSpinner, ErrorMessage } from '../../../shared/ui';
import { Toast } from '../../../shared/ui/Toast';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading, error, retry } = useProducts();
  const { addToCart } = useCartStore();
  const { toast, showToast, hideToast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === Number(id));

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Producto no encontrado</h2>
        <Link 
          to="/"
          className="bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition-colors"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const safeRating = product.rating || 0;
  const safePrice = product.price || 0;
  const safeSale = product.sale || 0;
  const safePublisher = product.publisher || "admin";
  const safeName = product.name || "Producto sin nombre";
  const safeDescription = product.description || "Sin descripción disponible";

  const handleAddToCart = async () => {
    try {
      for (let i = 0; i < quantity; i++) {
        await addToCart(product.id);
      }
      showToast(`${quantity} producto(s) agregado(s) al carrito`, 'success');
    } catch {
      showToast('Error al agregar al carrito', 'error');
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate('/cart');
  };

  const renderStars = (rating: number) => {
    const safeRating = rating || 0;
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={20}
        className={i < Math.floor(safeRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));
  };

  const calculateDiscountedPrice = (price: number, sale: number) => {
    const safePrice = price || 0;
    const safeSale = sale || 0;
    return safePrice * (1 - safeSale / 100);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR").format(price || 0);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-AR');
    } catch {
      return "Fecha no disponible";
    }
  };

  const discountedPrice = calculateDiscountedPrice(safePrice, safeSale);

  // Array de imágenes (en un caso real podrías tener múltiples imágenes)
  const productImages = [product.image, product.image, product.image]; // Placeholder

  return (
    <div className="min-h-screen bg-lime-50">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-lime-600">Inicio</Link>
            <span>/</span>
            {product.category && (
              <>
                <span className="hover:text-lime-600 cursor-pointer">{product.category.name}</span>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 font-medium truncate">{safeName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-lime-600 hover:text-lime-700 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <img
                src={productImages[selectedImage]}
                alt={safeName}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImage === index ? 'border-lime-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Vista ${index + 1} de ${safeName}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              {product.category && (
                <span className="inline-block bg-lime-100 text-lime-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{safeName}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(safeRating)}
                  <span className="text-sm text-gray-600 ml-1">
                    ({safeRating.toFixed(1)})
                  </span>
                </div>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">Vendido por {safePublisher}</span>
              </div>
            </div>

            {/* Precio */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="space-y-3">
                {safeSale > 0 ? (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-bold text-lime-600">
                        ${formatPrice(discountedPrice)}
                      </span>
                      <span className="text-2xl text-gray-400 line-through">
                        ${formatPrice(safePrice)}
                      </span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                        {safeSale}% OFF
                      </span>
                    </div>
                    <p className="text-green-600 font-semibold">
                      ¡Estás ahorrando ${formatPrice(safePrice - discountedPrice)}!
                    </p>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-lime-600">
                    ${formatPrice(safePrice)}
                  </span>
                )}
              </div>

              {/* Cantidad y acciones */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-gray-700 font-medium">Cantidad:</label>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-lime-500 text-white py-4 px-6 rounded-lg hover:bg-lime-600 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={24} />
                    Agregar al carrito
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-orange-500 text-white py-4 px-6 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg"
                  >
                    Comprar ahora
                  </button>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Heart size={20} />
                    Favorito
                  </button>
                  <button className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={20} />
                    Compartir
                  </button>
                </div>
              </div>
            </div>

            {/* Beneficios */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-4">Beneficios de tu compra</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="text-lime-600" size={24} />
                  <div>
                    <p className="font-medium">Envío gratis</p>
                    <p className="text-sm text-gray-600">En compras mayores a $50.000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="text-lime-600" size={24} />
                  <div>
                    <p className="font-medium">Garantía</p>
                    <p className="text-sm text-gray-600">12 meses de garantía</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="text-lime-600" size={24} />
                  <div>
                    <p className="font-medium">Devolución</p>
                    <p className="text-sm text-gray-600">30 días para devolver</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción y detalles */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Descripción del producto</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {safeDescription}
              </p>
            </div>

            {/* Sección de comentarios (vacía por ahora) */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
              <h2 className="text-2xl font-bold mb-6">Opiniones de clientes</h2>
              <div className="text-center py-12">
                <Star className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 text-lg">Este producto aún no tiene opiniones</p>
                <p className="text-gray-400 mt-2">Sé el primero en dejar tu comentario</p>
              </div>
            </div>
          </div>

          {/* Información del vendedor */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-4">Información del vendedor</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center">
                  <span className="text-lime-600 font-bold text-lg">
                    {safePublisher.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{safePublisher}</p>
                  <p className="text-sm text-gray-600">Vendedor oficial</p>
                </div>
              </div>
              <button className="w-full border border-lime-500 text-lime-600 py-2 rounded-lg hover:bg-lime-50 transition-colors">
                Ver más productos
              </button>
            </div>

            {/* Especificaciones */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-4">Especificaciones</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha de publicación</span>
                  <span className="font-medium">
                    {formatDate(product.dateAdded)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Calificación</span>
                  <span className="font-medium">{safeRating.toFixed(1)}/5</span>
                </div>
                {product.category && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categoría</span>
                    <span className="font-medium">{product.category.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};