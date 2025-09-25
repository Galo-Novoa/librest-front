import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

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

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          className="border rounded px-2 py-1 text-sm flex-1"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          autoFocus
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
      </div>
    );
  }

  const Tag = as;

  return (
    <div className="flex items-center gap-2">
      <Tag className={className}>{value ?? ""}</Tag>
      <button
        onClick={() => setIsEditing(true)}
        className="text-gray-400 hover:text-black text-sm"
      >
        <Pencil size={16} />
      </button>
    </div>
  );
};

export default EditableField;