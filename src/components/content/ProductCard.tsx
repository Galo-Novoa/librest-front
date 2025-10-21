import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import {
  AlertCircle,
  Trash2,
  Pencil,
  Check,
  X as CancelIcon,
  ShoppingCart,
  Star
} from "lucide-react";
import { uploadImage } from "../../api/cloudinary";

type Props = {
  product: Product & { _ts?: number };
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedFields: Partial<Product>) => void;
  onAddToCart: (productId: number) => void;
};

type EditValues = {
  name: string;
  description: string;
  price: string;
  image: string | File;
  rating: string;
  publisher: string;
  sale: string;
};

const ProductCard: React.FC<Props> = ({ product, onDelete, onUpdate, onAddToCart }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // CORRECCIÓN: Manejo seguro de valores null/undefined
  const [editValues, setEditValues] = useState<EditValues>({
    name: product.name || "",
    description: product.description || "",
    price: (product.price?.toString() || "0"),
    image: product.image || "",
    rating: (product.rating?.toString() || "0"),
    publisher: product.publisher || "admin",
    sale: (product.sale?.toString() || "0"),
  });
  
  const [previewImage, setPreviewImage] = useState<string>(product.image || "");

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevenir la navegación si se hizo clic en un botón
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditValues((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
    setImageError(false);
  };

  const handleSave = async () => {
    // CORRECCIÓN: Manejo seguro de conversión numérica
    const numericPrice = Number.parseFloat(editValues.price.replace(/[$\s]/g, "")) || 0;
    const numericRating = Number.parseFloat(editValues.rating) || 0;
    const numericSale = Number.parseInt(editValues.sale) || 0;
    
    let imageUrl = product.image || "";

    if (editValues.image instanceof File) {
      try {
        imageUrl = await uploadImage(editValues.image);
      } catch (error) {
        console.error("Error al subir imagen:", error);
        // Mantener la imagen anterior si hay error
        imageUrl = product.image || "";
      }
    }

    onUpdate(product.id, {
      name: editValues.name.trim(),
      description: editValues.description.trim(),
      price: numericPrice,
      image: imageUrl,
      rating: numericRating,
      publisher: editValues.publisher.trim(),
      sale: numericSale,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // CORRECCIÓN: Reset seguro con manejo de valores null
    setEditValues({
      name: product.name || "",
      description: product.description || "",
      price: (product.price?.toString() || "0"),
      image: product.image || "",
      rating: (product.rating?.toString() || "0"),
      publisher: product.publisher || "admin",
      sale: (product.sale?.toString() || "0"),
    });
    setPreviewImage(product.image || "");
    setIsEditing(false);
  };

  // CORRECCIÓN: Función segura para renderizar estrellas
  const renderStars = (rating: number) => {
    const safeRating = rating || 0;
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(safeRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));
  };

  // CORRECCIÓN: Función segura para calcular precio con descuento
  const calculateDiscountedPrice = (price: number, sale: number) => {
    const safePrice = price || 0;
    const safeSale = sale || 0;
    return safePrice * (1 - safeSale / 100);
  };

  // CORRECCIÓN: Función segura para formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR").format(price || 0);
  };

  // CORRECCIÓN: Función segura para obtener fecha
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('es-AR');
    } catch {
      return "Fecha no disponible";
    }
  };

  return (
    <fieldset
      className="relative border rounded-xl shadow-md p-4 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden w-full flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={handleCardClick} // ← NUEVO: Manejar clic en toda la card
    >
      {/* Botones flotantes */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // ← IMPORTANTE: Prevenir que el clic se propague al card
          onDelete(product.id);
        }}
        className={`w-12 h-12 flex items-center justify-center absolute top-2 right-2 bg-red-500 text-white rounded-full transition-all duration-300 z-10 hover:bg-red-600 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        aria-label="Eliminar producto"
        title="Eliminar producto"
      >
        <Trash2 size={25} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation(); // ← IMPORTANTE: Prevenir que el clic se propague al card
          setIsEditing(!isEditing);
        }}
        className={`w-12 h-12 flex items-center justify-center absolute top-15 right-2 bg-blue-500 text-white rounded-full transition-all duration-300 z-10 hover:bg-blue-600 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        aria-label="Editar producto"
        title={isEditing ? "Cancelar edición" : "Editar producto"}
      >
        {isEditing ? <CancelIcon size={28} /> : <Pencil size={22} />}
      </button>

      {!isEditing && (
        <button
          className={`w-12 h-12 flex items-center justify-center absolute top-28 right-2 bg-lime-500 text-white rounded-full transition-all duration-300 z-10 hover:bg-lime-600 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          aria-label="Añadir al carrito"
          title="Añadir al carrito"
          style={{ transitionProperty: "opacity, transform" }}
          onClick={(e) => {
            e.stopPropagation(); // ← IMPORTANTE: Prevenir que el clic se propague al card
            onAddToCart(product.id);
          }}
        >
          <ShoppingCart size={24} />
        </button>
      )}

      {/* Contenedor de dos columnas */}
      <div className="flex w-full gap-4">
        {/* Columna izquierda: imagen */}
        <div className="w-1/2 h-48 w-60 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          {imageError ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <AlertCircle className="text-gray-400 mb-2" size={48} />
              <span className="text-gray-500 text-sm">Imagen no disponible</span>
            </div>
          ) : (
            <img
              src={isEditing ? previewImage : product.image || ""}
              alt={product.name || "Producto sin nombre"}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          )}
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute bottom-2 left-2"
              onClick={(e) => e.stopPropagation()} // ← Prevenir navegación al seleccionar archivo
            />
          )}
        </div>

        {/* Columna derecha: contenido */}
        <div className="flex flex-col flex-1 gap-2">
          {isEditing ? (
            <>
              <input
                value={editValues.name}
                onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                className="text-lg font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-500"
                onClick={(e) => e.stopPropagation()} // ← Prevenir navegación al editar
              />
              <textarea
                value={editValues.description}
                onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                className="text-gray-600 text-sm border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-500 resize-none truncate line-clamp-3"
                onClick={(e) => e.stopPropagation()} // ← Prevenir navegación al editar
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={editValues.rating}
                  onChange={(e) => setEditValues({ ...editValues, rating: e.target.value })}
                  className="text-sm border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-500"
                  placeholder="Rating"
                  onClick={(e) => e.stopPropagation()} // ← Prevenir navegación al editar
                />
                <input
                  value={editValues.sale}
                  onChange={(e) => setEditValues({ ...editValues, sale: e.target.value })}
                  className="text-sm border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-500"
                  placeholder="Descuento %"
                  onClick={(e) => e.stopPropagation()} // ← Prevenir navegación al editar
                />
              </div>
              <input
                value={editValues.publisher}
                onChange={(e) => setEditValues({ ...editValues, publisher: e.target.value })}
                className="text-sm border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-500"
                placeholder="Vendedor"
                onClick={(e) => e.stopPropagation()} // ← Prevenir navegación al editar
              />
              <input
                value={editValues.price}
                onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
                className="text-2xl font-bold text-lime-600 border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-lime-500"
                onClick={(e) => e.stopPropagation()} // ← Prevenir navegación al editar
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ← Prevenir navegación al guardar
                    handleSave();
                  }}
                  className="bg-lime-500 text-white px-4 py-1 rounded hover:bg-lime-600 flex items-center"
                >
                  <Check size={16} className="inline mr-1" /> Guardar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ← Prevenir navegación al cancelar
                    handleCancel();
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 flex items-center"
                >
                  <CancelIcon size={16} className="inline mr-1" /> Cancelar
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                {product.name || "Producto sin nombre"}
              </h2>
              
              {/* Rating y Categoría */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating || 0)}
                  <span className="text-sm text-gray-500">
                    ({(product.rating || 0).toFixed(1)})
                  </span>
                </div>
                {product.category && (
                  <span className="text-xs bg-lime-100 text-lime-800 px-2 py-1 rounded-full">
                    {product.category.name}
                  </span>
                )}
              </div>

              {/* Publisher */}
              <p className="text-sm text-gray-500">
                Vendido por: {product.publisher || "admin"}
              </p>

              <p className="text-gray-600 text-sm line-clamp-3 flex-1">
                {product.description || "Sin descripción"}
              </p>

              <div className="mt-auto pt-2 border-t border-gray-200">
                {/* Precio con descuento */}
                {(product.sale || 0) > 0 ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-500">
                      -{product.sale}%
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-lime-600">
                        ${formatPrice(
                          calculateDiscountedPrice(Number(product.price || 0), product.sale || 0)
                        )}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${formatPrice(Number(product.price || 0))}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-black">
                    ${formatPrice(Number(product.price || 0))}
                  </p>
                )}
                
                {/* Fecha de agregado */}
                <p className="text-xs text-gray-400 mt-1">
                  Agregado: {formatDate(product.dateAdded)}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-lime-500 transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </fieldset>
  );
};

export default ProductCard;