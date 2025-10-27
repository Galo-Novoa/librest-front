import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lime-100">
      <AlertCircle className="text-red-500 mb-4" size={64} />
      <p className="text-xl text-red-600 mb-4 font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-lime-500 text-white px-6 py-2 rounded-lg hover:bg-lime-600 transition-colors font-semibold"
        >
          Reintentar
        </button>
      )}
    </div>
  );
};