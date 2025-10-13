import { useEffect } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: { bg: "bg-green-500", Icon: CheckCircle },
    error: { bg: "bg-red-500", Icon: XCircle },
    info: { bg: "bg-blue-500", Icon: Info },
  };

  const { bg, Icon } = config[type];

  return (
    <div className={`fixed top-4 right-4 ${bg} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-in slide-in-from-top duration-300`}>
      <Icon size={20} />
      <span className="font-medium">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-2 hover:opacity-80 transition-opacity"
        aria-label="Cerrar notificación"
      >
        <X size={16} />
      </button>
    </div>
  );
}