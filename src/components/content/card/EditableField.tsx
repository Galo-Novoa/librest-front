import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";

type Props = {
  value: string | number | null | undefined;
  onSave: (newValue: string) => void;
  as?: "p" | "h2";
  className?: string;
};

const EditableField: React.FC<Props> = ({ value, onSave, as = "p", className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value?.toString() || "");

  useEffect(() => {
    setTempValue(value?.toString() || "");
  }, [value]);

  const handleSave = () => {
    setIsEditing(false);
    if (tempValue !== value?.toString()) {
      onSave(tempValue);
    }
  };

  const handleCancel = () => {
    setTempValue(value?.toString() || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          className="border border-lime-500 rounded px-2 py-1 text-sm flex-1 focus:ring-2 focus:ring-lime-500 outline-none"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          autoFocus
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
          }}
        />
        <button
          onClick={handleSave}
          className="text-green-500 hover:text-green-700"
          aria-label="Guardar"
        >
          <Check size={16} />
        </button>
        <button
          onClick={handleCancel}
          className="text-red-500 hover:text-red-700"
          aria-label="Cancelar"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  const Tag = as;

  return (
    <div className="flex items-center gap-2 group">
      <Tag className={className}>{value ?? ""}</Tag>
      <button
        onClick={() => setIsEditing(true)}
        className="text-gray-400 hover:text-lime-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Editar"
      >
        <Pencil size={16} />
      </button>
    </div>
  );
};

export default EditableField;