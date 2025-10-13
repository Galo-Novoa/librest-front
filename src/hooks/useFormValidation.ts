import { useState } from "react";

export interface ValidationErrors {
  [key: string]: string;
}

export function useFormValidation() {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateProduct = (data: {
    name: string;
    price: number | string;
    description: string;
  }) => {
    const newErrors: ValidationErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (data.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!data.price || data.price === "") {
      newErrors.price = "El precio es requerido";
    } else if (Number(data.price) <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
    } else if (Number(data.price) > 999999) {
      newErrors.price = "El precio es demasiado alto";
    }

    if (!data.description.trim()) {
      newErrors.description = "La descripción es requerida";
    } else if (data.description.trim().length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres";
    } else if (data.description.trim().length > 500) {
      newErrors.description = "La descripción no puede exceder 500 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => setErrors({});

  return { errors, validateProduct, clearErrors };
}