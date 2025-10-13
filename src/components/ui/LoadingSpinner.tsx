import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-lime-100">
      <div className="text-center">
        <Loader2 className="animate-spin text-lime-600 mx-auto mb-4" size={48} />
        <p className="text-xl text-gray-700 font-medium">Cargando productos...</p>
      </div>
    </div>
  );
}